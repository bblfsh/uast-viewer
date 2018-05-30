FROM node:8

RUN apt-get update && apt-get install git -y

WORKDIR /proj

RUN git clone https://github.com/bblfsh/uast-viewer.git && cd uast-viewer && yarn && yarn build && yarn link

RUN npx create-react-app file-viewer

WORKDIR /proj/file-viewer

RUN yarn add codemirror react-codemirror2

RUN yarn link uast-viewer

ADD App.js ./src/

#RUN yarn build

EXPOSE 3000

ENTRYPOINT yarn start
