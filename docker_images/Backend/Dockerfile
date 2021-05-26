FROM node
WORKDIR /home/node

# using wildcard (*) to copy both package.json and package-lock.json
COPY package*.json /home/node/
RUN yarn install --production

# create and set app directory as current dir
WORKDIR /home/node/app
COPY app/ /home/node/app/
EXPOSE 8081 8083
CMD ["node", "app.js"]
