FROM node:22.12.0 AS deps
WORKDIR /app
COPY package*.json .
RUN npm i

FROM deps AS dev
COPY . .
ENTRYPOINT [ "sh", "./entrypoint.sh" ]
