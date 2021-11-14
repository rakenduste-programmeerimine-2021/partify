FROM node:16-alpine

ENV ROOT /usr/src/app
WORKDIR ${ROOT}

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV development

ENTRYPOINT ["npm"]
CMD ["start"]

EXPOSE 3000

