FROM node:14
COPY ./server /var/www/html
RUN npm install
EXPOSE 80
ENTRYPOINT [ "npm", "run" , "dev" ]
