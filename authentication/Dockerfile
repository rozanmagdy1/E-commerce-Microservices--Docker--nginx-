FROM node:20.5.0
WORKDIR /gro-mart-admin-backend/authentication
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8001
CMD ["node", "server.js"]