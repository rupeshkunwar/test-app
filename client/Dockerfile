FROM node:22.14.0-alpine3.21 AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
ENV NODE_ENV=production
RUN npm ci --ignore-scripts && npm cache clean --force
COPY . .
RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27-alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
