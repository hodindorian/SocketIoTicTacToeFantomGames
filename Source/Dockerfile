FROM node:14
COPY ./server /var/www/html
WORKDIR /var/www/html
RUN npm install
ENTRYPOINT [ "npm", "start" ]
