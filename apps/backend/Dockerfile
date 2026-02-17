# -------- BASE --------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# -------- DEVELOPMENT --------
FROM base AS development

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# -------- BUILD --------
FROM base AS build

RUN npm install
COPY . .
RUN npm run build

# -------- PRODUCTION --------
FROM node:18-alpine AS production

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/server.js"]
