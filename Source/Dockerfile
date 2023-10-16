FROM node:14
WORKDIR ./server
RUN ls ./server
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run" , "dev" ]
