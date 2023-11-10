FROM node:14
RUN ls /usr/local/apache2
COPY ./server .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
