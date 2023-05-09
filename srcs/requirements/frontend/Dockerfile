FROM node:16-alpine

LABEL description="frontend Docker image based on node"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./transc-frontend/* /usr/src/app/

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]