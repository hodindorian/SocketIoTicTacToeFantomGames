FROM node:14
RUN ls /var/www/html
COPY ./server .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
