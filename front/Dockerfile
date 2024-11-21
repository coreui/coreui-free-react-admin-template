FROM node:22-alpine

RUN npm install -g nodemon
RUN npm run build

WORKDIR /front
COPY . .
#COPY package.json .
RUN npm install

EXPOSE 3001
CMD ["npm", "start"]

