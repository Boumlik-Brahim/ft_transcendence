FROM node:16-alpine

LABEL description="frontend Docker image based on node"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ./transc-frontend/package*.json /usr/src/app/

EXPOSE 5173

ENTRYPOINT [ "/bin/sh", "/usr/src/app/script.sh" ]