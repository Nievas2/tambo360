import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter: Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
  host: "smtp.gmail.com", // explicit host
  port: 465,              // SSL
  secure: true,           // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  family: 4, // ⚠️ fuerza IPv4, evita ENETUNREACH en Render
} as SMTPTransport.Options);

export async function sendVerificationEmail(to: string, link: string) {
  const info = await transporter.sendMail({
    from: `"Tambo360" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Verificá tu cuenta en Tambo360",

    text: `
Hola,

Recibimos tu solicitud para crear una cuenta en Tambo360.

Para activar tu acceso necesitás verificar tu dirección de correo electrónico.

Copiá y pegá este enlace en tu navegador:

${link}

Este enlace estará disponible por 24 horas.

Si no solicitaste esta cuenta, podés ignorar este mensaje.

Equipo Tambo360
`,

    html: `
<div style="background-color:#f4f6f8; padding:40px 0; font-family: Arial, sans-serif;">
  <div style="
      max-width:600px;
      margin:0 auto;
      background-color:#ffffff;
      padding:40px;
      border-radius:10px;
      border:1px solid #e5e7eb;
      box-shadow:0 4px 12px rgba(0,0,0,0.05);
      text-align:left;
  ">
    
    <h2 style="margin-top:0; color:#1f2937; text-align:center;">
      Verificá tu cuenta en Tambo360
    </h2>

    <p style="color:#374151; line-height:1.6;">
      Hola,
    </p>

    <p style="color:#374151; line-height:1.6;">
      Recibimos tu solicitud para crear una cuenta en <strong>Tambo360</strong>.
    </p>

    <p style="color:#374151; line-height:1.6;">
      Para activar tu acceso y comenzar a registrar la producción de tu establecimiento,
      necesitás verificar tu dirección de correo electrónico.
    </p>

    <div style="text-align:center; margin:35px 0;">
      <a 
        href="${link}" 
        style="
          background-color:#2563eb;
          color:#ffffff;
          padding:14px 24px;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
          display:inline-block;
        "
      >
        Verificar cuenta
      </a>
    </div>
    <p style="font-size:12px; word-break:break-all; color:#6b7280;">
Si el botón no funciona, copiá y pegá este enlace en tu navegador:
<br/>
${link}
</p>

    <p style="color:#374151; line-height:1.6;">
      Este enlace estará disponible por las próximas 24 horas.
    </p>

    <p style="color:#6b7280; font-size:12px; line-height:1.5;">
      Si no solicitaste esta cuenta, podés ignorar este mensaje.
      No se realizará ninguna acción adicional.
    </p>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;" />

    <p style="color:#6b7280; font-size:12px; text-align:center;">
      Equipo Tambo360
    </p>

  </div>
</div>
`
  });
}

export async function sendPasswordResetEmail(to: string, link: string) {
  const info = await transporter.sendMail({
    from: `"Tambo360" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Recuperá tu contraseña en Tambo360",

    text: `
Hola,

Recibimos una solicitud para restablecer la contraseña de tu cuenta en Tambo360.

Para continuar, copiá y pegá el siguiente enlace en tu navegador:

${link}

Este enlace estará disponible por 1 hora.

Si no solicitaste este cambio, podés ignorar este mensaje. 
Tu contraseña actual seguirá siendo válida.

Equipo Tambo360
`,

    html: `
<div style="background-color:#f4f6f8; padding:40px 0; font-family: Arial, sans-serif;">
  <div style="
      max-width:600px;
      margin:0 auto;
      background-color:#ffffff;
      padding:40px;
      border-radius:10px;
      border:1px solid #e5e7eb;
      box-shadow:0 4px 12px rgba(0,0,0,0.05);
      text-align:left;
  ">
    
    <h2 style="margin-top:0; color:#1f2937; text-align:center;">
      Recuperación de contraseña
    </h2>

    <p style="color:#374151; line-height:1.6;">
      Hola,
    </p>

    <p style="color:#374151; line-height:1.6;">
      Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Tambo360</strong>.
    </p>

    <p style="color:#374151; line-height:1.6;">
      Para continuar con el proceso y definir una nueva contraseña,
      hacé clic en el siguiente botón:
    </p>

    <div style="text-align:center; margin:35px 0;">
      <a 
        href="${link}" 
        style="
          background-color:#dc2626;
          color:#ffffff;
          padding:14px 24px;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
          display:inline-block;
        "
      >
        Restablecer contraseña
      </a>
    </div>

    <p style="color:#374151; line-height:1.6;">
      Este enlace estará disponible por 15 minutos.
    </p>

    <p style="color:#6b7280; font-size:12px; line-height:1.5;">
      Si no solicitaste este cambio, podés ignorar este mensaje.
      Tu contraseña actual seguirá siendo válida.
    </p>

    <p style="font-size:12px; word-break:break-all; color:#6b7280;">
      Si el botón no funciona, copiá y pegá este enlace en tu navegador:
      <br/>
      ${link}
    </p>

    <hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;" />

    <p style="color:#6b7280; font-size:12px; text-align:center;">
      Equipo Tambo360
    </p>

  </div>
</div>
`
  });
}