FROM node   
#directly use node image

WORKDIR /app
#Everything will run from app

COPY . .
#Copy Everything From source to destination

RUN npm i
#build 
EXPOSE 5003

ENTRYPOINT [ "node", "server.js" ]