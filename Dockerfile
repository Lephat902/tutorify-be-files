FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app sources
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]