FROM node:14.18-alpine3.14
WORKDIR /usr/src/asap
COPY . /usr/src/asap

RUN npm install
RUN npm run build
CMD ["node", "build/server"]