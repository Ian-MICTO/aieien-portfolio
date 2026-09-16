FROM node:20-alpine AS base

# Install system dependencies for build (e.g. sharp, vips)
RUN apk update && apk add --no-cache libc6-compat vips-dev build-base gcc autoconf automake zlib-dev libpng-dev nasm git

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm config set enable-pre-post-scripts true

WORKDIR /opt/app

# Dependencies stage
FROM base AS dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile --config.enable-pre-post-scripts=true

# Build stage
FROM base AS build
COPY --from=dependencies /opt/app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN pnpm build

# Production runner stage
FROM node:20-alpine AS runner
RUN apk add --no-cache vips-dev
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /opt/app
ENV NODE_ENV=production

COPY --from=build /opt/app/package.json ./package.json
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/dist ./dist
COPY --from=build /opt/app/config ./config
COPY --from=build /opt/app/public ./public
COPY --from=build /opt/app/src ./src
COPY --from=build /opt/app/types ./types
COPY --from=build /opt/app/favicon.png ./favicon.png

RUN chown -R node:node /opt/app
USER node

EXPOSE 1337

CMD ["pnpm", "start"]
