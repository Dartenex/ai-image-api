FROM node:18-alpine as build_stage

WORKDIR /app
COPY package-lock.json .
COPY package.json .

RUN npm i

COPY . .
RUN npm run build

FROM node:18-alpine as prod_stage

WORKDIR /app

COPY package-lock.json .
COPY package.json .
RUN npm ci --omit=dev

COPY --from=build_stage /app/dist .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
