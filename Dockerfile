# Base Image
FROM node:14

# Create user
USER node

# Create new directory for the app
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

#
COPY --chown=node:node . .

# Install dependencies
RUN yarn install

#
EXPOSE 3000

#
CMD ["yarn", "dev"]
