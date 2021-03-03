FROM node:14

WORKDIR /usr/src/app
COPY package.json .
COPY server.js .
COPY views .

ENV HOST localhost
ENV PORT 80

EXPOSE 80

RUN npm install
CMD ["node", "server.js"]