FROM node:16.18-buster-slim
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
CMD ["node", "worker.js"]