FROM node:14
COPY ./server /var/www/html
WORKDIR /var/www/html
RUN ls
RUN npm install /var/www/html/package.json
EXPOSE 80
CMD [ "npm", "run" , "dev" ]
