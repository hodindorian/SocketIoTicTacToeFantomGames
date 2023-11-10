FROM node:14
RUN find -iname "httpd"
COPY ./server .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
