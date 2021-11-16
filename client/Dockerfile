FROM node:16-alpine

# Working directory be app
WORKDIR /usr/app

COPY package*.json ./

# Install dependencies
RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache


# copy local files to app folder
COPY . .

EXPOSE 3000

CMD ["npm","start"]