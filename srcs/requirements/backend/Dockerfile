FROM node:16-alpine

LABEL description="backend Docker image based on node"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./transc-backend/package*.json /usr/src/app/

EXPOSE 3000

ENTRYPOINT [ "/bin/sh", "/usr/src/app/script.sh" ]