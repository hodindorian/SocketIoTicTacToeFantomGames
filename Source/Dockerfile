FROM node:14
COPY ./server .
RUN npm install
RUN cat /etc/httpd/conf/httpd.conf
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]
