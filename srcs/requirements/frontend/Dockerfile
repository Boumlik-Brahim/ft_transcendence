FROM node

LABEL description="frontend Docker image based on node"

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY package*.json ./

RUN npm install

COPY ./ ./usr/src/app/frontend

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]