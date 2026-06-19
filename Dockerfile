# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache git && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN --mount=type=secret,id=app_env,target=/app/.env,required=false pnpm build

FROM nginx:alpine AS runtime
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
