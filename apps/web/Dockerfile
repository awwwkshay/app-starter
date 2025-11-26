FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN npm install -g pnpm
RUN pnpm install

COPY . .
ENV NODE_ENV=production
RUN pnpm run build

FROM nginx:alpine

ENV PORT=80

COPY --from=build /app/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

ENTRYPOINT [ "nginx" ]
CMD ["-g", "daemon off;"]