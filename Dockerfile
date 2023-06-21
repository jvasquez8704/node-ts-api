FROM node:14.21-alpine3.16
WORKDIR /usr/src/atom
COPY . /usr/src/atom

RUN npm install
RUN npm run build
CMD ["node", "build/server"]