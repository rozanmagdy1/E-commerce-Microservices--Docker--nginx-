FROM node:20.5.0
WORKDIR /gro-mart-admin-backend/shopping
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8003
CMD ["node", "server.js"]