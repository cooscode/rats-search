FROM node:20
ARG DEBIAN_FRONTEND=noninteractive
RUN mkdir -p /app/node_modules
WORKDIR /app
COPY . .
RUN npm install -g npm

RUN npm install --force
RUN ls -la
RUN npm run buildweb

EXPOSE 8095
CMD [ "node", "src/background/server.js" ]
