# -------- BASE --------
FROM node:20-slim AS base

# Instalar openssl
RUN apt-get update -y \
  && apt-get install -y openssl \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./

# -------- DEVELOPMENT --------
FROM base AS development

RUN npm install
COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dev"]


# -------- BUILD --------
FROM base AS build

RUN npm install
COPY . .

RUN npx prisma generate
RUN npm run build


# -------- PRODUCTION --------
FROM node:20-slim AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/server.js"]
