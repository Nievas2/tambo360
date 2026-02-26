const axios = require('axios');
const { google } = require('googleapis');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GOOGLE_SHEETS_CREDENTIALS = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS);
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const PROJECT_NUMBER = parseInt(process.env.PROJECT_NUMBER);
const ORG_NAME = process.env.ORG_NAME;

async function getProjectItems() {
  const query = `
    query {
      organization(login: "${ORG_NAME}") {
        projectV2(number: ${PROJECT_NUMBER}) {
          items(first: 100) {
            nodes {
              id
              title
              fieldValues(first: 20) {
                nodes {
                  ... on ProjectV2ItemFieldTextValue {
                    text
                    field {
                      name
                    }
                  }
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    name
                    field {
                      name
                    }
                  }
                  ... on ProjectV2ItemFieldDateValue {
                    date
                    field {
                      name
                    }
                  }
                  ... on ProjectV2ItemFieldNumberValue {
                    number
                    field {
                      name
                    }
                  }
                }
              }
              content {
                ... on Issue {
                  title
                  number
                  url
                  state
                  assignees(first: 5) {
                    nodes {
                      login
                    }
                  }
                  labels(first: 5) {
                    nodes {
                      name
                    }
                  }
                  createdAt
                  updatedAt
                }
                ... on PullRequest {
                  title
                  number
                  url
                  state
                  assignees(first: 5) {
                    nodes {
                      login
                    }
                  }
                  labels(first: 5) {
                    nodes {
                      name
                    }
                  }
                  createdAt
                  updatedAt
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    }
  `;

  const response = await axios.post(
    'https://api.github.com/graphql',
    { query },
    {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (response.data.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(response.data.errors)}`);
  }

  return response.data.data.organization.projectV2.items.nodes;
}

async function updateGoogleSheet(items) {
  const auth = new google.auth.GoogleAuth({
    credentials: GOOGLE_SHEETS_CREDENTIALS,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });

  // Preparar datos
  const rows = [
    ['ID', 'Título', 'Número', 'URL', 'Estado', 'Asignados', 'Labels', 'Creado', 'Actualizado']
  ];

  items.forEach((item) => {
    const content = item.content;
    if (!content) return;

    const assignees = content.assignees.nodes.map(a => a.login).join(', ');
    const labels = content.labels.nodes.map(l => l.name).join(', ');

    rows.push([
      item.id,
      content.title,
      content.number,
      content.url,
      content.state,
      assignees,
      labels,
      new Date(content.createdAt).toLocaleDateString(),
      new Date(content.updatedAt).toLocaleDateString(),
    ]);
  });

  // Limpiar hoja anterior y escribir nuevos datos
  await sheets.spreadsheets.values.clear({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Sheet1!A:I',
  });

  await sheets.spreadsheets.values.update({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    requestBody: {
      values: rows,
    },
  });

  console.log(`✅ Sincronizados ${items.length} items a Google Sheets`);
}

async function main() {
  try {
    console.log('📊 Obteniendo items del project...');
    const items = await getProjectItems();
    
    console.log(`📝 Actualizando Google Sheets con ${items.length} items...`);
    await updateGoogleSheet(items);
    
    console.log('✨ ¡Sincronización completada!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
