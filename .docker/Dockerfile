# Base - Common dependencies for both Builder and Server
FROM node:22-slim AS builder
WORKDIR /usr/app

COPY ../package.json ../pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY ../ ./

RUN pnpm app:build

# Server - Run the app
FROM node:22-alpine
ARG SERVER_MODE=production
WORKDIR /usr/app

COPY --from=builder /usr/app/package.json /usr/app/pnpm-lock.yaml /usr/app/.env ./
COPY --from=builder /usr/app/dist ./dist


RUN npm install -g pnpm
RUN pnpm install
# RUN if [ "$SERVER_MODE" = "production" ]; then pnpm install --ignore-scripts --prod; else pnpm install; fi

EXPOSE ${SERVER_PORT}

CMD ["pnpm", "app:start"]
