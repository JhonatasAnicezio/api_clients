FROM node:22.0-alpine AS build

WORKDIR /src
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.0-alpine

WORKDIR /src

COPY --from=build /src/dist /src/dist
COPY --from=build /src/node_modules /src/node_modules

EXPOSE 3001

CMD ["node", "dist/main.js"]
