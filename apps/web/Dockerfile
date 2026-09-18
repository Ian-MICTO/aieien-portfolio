FROM node:20-alpine AS build

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --no-frozen-lockfile --ignore-scripts

COPY . .

ARG PUBLIC_STRAPI_URL=https://aieien-backend.onrender.com
ARG STRAPI_URL=https://aieien-backend.onrender.com
ARG STRAPI_API_TOKEN="e9a529e01acdf94252c971ed2eace29b1bca402851e7a072f898d6214082edb9d18c5f925839f0b5815ed2dab529667ccbe04f4bac38b229c715d42d6b263cc9084431ce2a2f2a6ef75ee269131c9b4051d59091814164f242b242af1fe4545d5c5161171446b4451e5698f68629f9335c6ad58282de3b7ab103280bc5c47f98"

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
