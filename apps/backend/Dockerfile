FROM node:20-alpine AS base

# Install system dependencies for build (e.g. sharp, vips)
RUN apk update && apk add --no-cache libc6-compat vips-dev build-base gcc autoconf automake zlib-dev libpng-dev nasm git
RUN npm install -g pnpm@latest

WORKDIR /opt/app

# Dependencies stage
FROM base AS dependencies
COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --no-frozen-lockfile --ignore-scripts

# Build stage
FROM base AS build
COPY --from=dependencies /opt/app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm build

# Production runner stage
FROM node:20-alpine AS runner
RUN apk add --no-cache vips-dev
RUN npm install -g pnpm@latest

WORKDIR /opt/app
ENV NODE_ENV=production

RUN mkdir -p /opt/app/database /opt/app/public/uploads /opt/app/.tmp /opt/app/dist

COPY --from=build --chown=node:node /opt/app/package.json ./package.json
COPY --from=build --chown=node:node /opt/app/tsconfig.json* ./tsconfig.json
COPY --from=build --chown=node:node /opt/app/node_modules ./node_modules
COPY --from=build --chown=node:node /opt/app/dist/config ./config
COPY --from=build --chown=node:node /opt/app/dist/src ./src
COPY --from=build --chown=node:node /opt/app/dist ./dist
COPY --from=build --chown=node:node /opt/app/.strapi ./.strapi
COPY --from=build --chown=node:node /opt/app/public ./public
COPY --from=build --chown=node:node /opt/app/favicon.png ./favicon.png

# Ensure admin build is found whether Strapi resolves dist/build, ./build or nested admin package path
RUN ln -s /opt/app/dist/build /opt/app/build && \
    ADMIN_PATH=$(find /opt/app/node_modules -path "*/@strapi/admin/dist/server" -type d 2>/dev/null | head -1) && \
    if [ -n "$ADMIN_PATH" ]; then \
      mkdir -p "$ADMIN_PATH/server" && \
      ln -sf /opt/app/dist/build "$ADMIN_PATH/server/build"; \
    fi

RUN chown -R node:node /opt/app

USER node

EXPOSE 1337

CMD ["pnpm", "start"]
