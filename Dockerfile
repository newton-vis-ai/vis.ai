FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --update python3 py3-pip

RUN npm config set legacy-peer-deps true

RUN npm cache clean --force

RUN npm i npm@latest

RUN npm install -g @ionic/cli

RUN npm install

COPY . .

EXPOSE 8200

ENTRYPOINT ["ionic"]    

CMD ["serve", "--port", "8200", "--address", "0.0.0.0"]
