FROM node:20-alpine AS build

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --no-frozen-lockfile --ignore-scripts

COPY . .

ARG PUBLIC_STRAPI_URL=https://aieien-backend.onrender.com
ARG STRAPI_URL=https://aieien-backend.onrender.com
ARG STRAPI_API_TOKEN=""

ENV PUBLIC_STRAPI_URL=$PUBLIC_STRAPI_URL
ENV STRAPI_URL=$STRAPI_URL
ENV STRAPI_API_TOKEN=$STRAPI_API_TOKEN

RUN pnpm build

FROM node:20-alpine AS runner

RUN npm install -g pnpm@latest

WORKDIR /app

COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/astro.config.mjs ./astro.config.mjs

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["sh", "-c", "pnpm preview --host 0.0.0.0 --port ${PORT:-4321}"]
