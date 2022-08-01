FROM node:16-alpine3.15

# Create app directory
WORKDIR /var/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# copying packages first helps take advantage of docker layers
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

RUN npm install sequelize-cli --save

CMD [ "node", "bin/www" ]
