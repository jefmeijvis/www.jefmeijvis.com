# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache git && corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG PRIVATE_SUPABASE_URL
ARG PRIVATE_SUPABASE_KEY

RUN PRIVATE_SUPABASE_URL="$PRIVATE_SUPABASE_URL" \
    PRIVATE_SUPABASE_KEY="$PRIVATE_SUPABASE_KEY" \
    pnpm build

FROM nginx:alpine AS runtime
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
