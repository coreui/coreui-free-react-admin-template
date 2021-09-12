FROM node:14.17-alpine
WORKDIR /app
# Install app dependencies
COPY package*.json ./
COPY client/package*.json ./client/
COPY backend/package*.json ./backend/
RUN yarn local-install
# Bundle app source
COPY . .
ENV PORT=3000
ENV NODE_ENV=production
ENV newReg=false
RUN yarn run build-client

EXPOSE 3000
CMD [ "node", "index.js" ]