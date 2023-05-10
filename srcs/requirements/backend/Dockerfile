FROM node:16-alpine

LABEL description="backend Docker image based on node"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./transc-backend/* /usr/src/app/

RUN sh script.sh

RUN npm run build

EXPOSE 3000

CMD ["npm", "start", "start:dev"]