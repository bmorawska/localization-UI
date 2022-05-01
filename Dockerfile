FROM node:16

WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install
EXPOSE 3000
CMD [ "node","server.js" ]
