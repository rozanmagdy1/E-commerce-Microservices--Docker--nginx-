FROM node:20.5.0
WORKDIR /gro-mart-admin-backend/order
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8002
CMD ["node", "server.js"]