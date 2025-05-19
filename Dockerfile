FROM node:22-alpine AS web-builder
WORKDIR /app
COPY . .

WORKDIR /app/apps/web
RUN npm ci && npm run build

FROM node:22-alpine AS api-builder
WORKDIR /app
COPY . .

WORKDIR /app/apps/api
RUN npm ci && npm run build

FROM node:22-alpine AS api-runtime
WORKDIR /app

COPY --from=web-builder /app/apps/web/dist ./dist

COPY --from=api-builder /app/apps/api/dist-api ./dist-api

COPY --from=api-builder /app/node_modules ./node_modules

COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

EXPOSE 8080

# 実行（ビルド済みのindex.js）
CMD ["node", "dist-api/node.js"]
