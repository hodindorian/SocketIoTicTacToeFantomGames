FROM node:14
WORKDIR ./server
COPY ./server/package.json .
RUN npm install
COPY ./server .
EXPOSE 3000
ENTRYPOINT [ "npm", "run" , "dev" ]
