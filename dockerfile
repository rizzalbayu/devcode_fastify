FROM node:12-alpine

WORKDIR /app
COPY package*.json .

RUN npm install --only=prod
COPY . .
EXPOSE 3030

CMD ["npm", "run", "start"]