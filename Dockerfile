FROM node:20.19.0

WORKDIR /supplements-client

COPY package*.json ./

COPY . .

RUN npm install


RUN npm run build

EXPOSE 5500

CMD ["npm", "run", "dev", "--", "--host", "--port", "5500"]