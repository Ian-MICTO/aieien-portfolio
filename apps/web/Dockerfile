FROM node:20-alpine AS build

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --no-frozen-lockfile --ignore-scripts

COPY . .

ARG PUBLIC_STRAPI_URL=http://localhost:1337
ARG STRAPI_URL=http://backend:1337
ARG STRAPI_API_TOKEN=""

ENV PUBLIC_STRAPI_URL=$PUBLIC_STRAPI_URL
ENV STRAPI_URL=$STRAPI_URL
ENV STRAPI_API_TOKEN=$STRAPI_API_TOKEN

RUN pnpm build

FROM nginx:alpine AS runner

COPY --from=build /app/dist /usr/share/nginx/html

RUN printf 'server {\n\
    listen 4321;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ $uri.html /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 4321

CMD ["nginx", "-g", "daemon off;"]
