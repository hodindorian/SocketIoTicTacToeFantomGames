FROM node:14
WORKDIR ./server
COPY ./server .
RUN ls -l && echo "serevr"
COPY package.json .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "npm", "run" , "dev" ]
