FROM node

LABEL description="backend Docker image based on node"

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

COPY ./ ./usr/src/app/backend

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]