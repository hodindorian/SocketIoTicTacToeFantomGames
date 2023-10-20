FROM node:14
WORKDIR ./server
COPY ./server/package.json /var/www/html
RUN npm install
COPY ./server /var/www/html
EXPOSE 80
ENTRYPOINT [ "npm", "run" , "dev" ]
