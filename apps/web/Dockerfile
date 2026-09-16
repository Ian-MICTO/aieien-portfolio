FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm config set enable-pre-post-scripts true

WORKDIR /app

# Dependencies stage
FROM base AS dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --no-frozen-lockfile --config.enable-pre-post-scripts=true

# Build stage
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
ARG STRAPI_URL
ARG STRAPI_API_TOKEN
ENV STRAPI_URL=${STRAPI_URL}
ENV STRAPI_API_TOKEN=${STRAPI_API_TOKEN}
RUN pnpm build

# Runner stage (serves Astro production static bundle on port 4321)
FROM node:20-alpine AS runner
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "4321"]
