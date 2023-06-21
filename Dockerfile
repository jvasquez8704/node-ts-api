FROM node:16.20-alpine3.17
WORKDIR /usr/src/asap
COPY . /usr/src/asap

RUN npm install
RUN npm run build
CMD ["node", "build/server"]