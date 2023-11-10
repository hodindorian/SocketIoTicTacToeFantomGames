FROM node:14
RUN ls /etc/httpd
COPY ./server .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
