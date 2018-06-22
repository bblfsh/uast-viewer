FROM node:8

#RUN apt-get update && apt-get install git -y

WORKDIR /proj

RUN npx create-react-app file-viewer

WORKDIR /proj/file-viewer

ADD App.js ./src/
ADD package.json ./

RUN yarn

EXPOSE 3000

ENTRYPOINT yarn start
