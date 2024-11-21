FROM node:22-alpine

RUN npm install -g nodemon

WORKDIR /front
COPY . .
#COPY package.json .
RUN npm install

EXPOSE 3001
CMD ["npm", "run", "start"]
