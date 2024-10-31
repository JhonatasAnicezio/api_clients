FROM node:22.0-alpine AS build

WORKDIR /src
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22.0-alpine

WORKDIR /src

ENV POSTGRES_PRISMA_URL="postgres://default:Vhg93sqoPxld@ep-delicate-paper-974919.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
ENV SECRET="\$2b\$15\$jvP800YD37obi18v8PV3Q."

COPY --from=build /src/dist /src/dist
COPY --from=build /src/node_modules /src/node_modules

EXPOSE 3001

CMD ["node", "dist/main.js"]
