FROM node:20-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm i -g pnpm
RUN npm install -g rimraf

RUN pnpm install

COPY . .

RUN pnpm run build
EXPOSE 4004

CMD [ "pnpm", "start"]