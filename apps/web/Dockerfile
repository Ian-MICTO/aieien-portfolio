FROM node:20-alpine

RUN npm install -g pnpm@latest

WORKDIR /app

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --no-frozen-lockfile --ignore-scripts

COPY . .

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "4321"]
