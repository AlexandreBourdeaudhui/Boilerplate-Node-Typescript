#
FROM node:14

#
RUN mkdir /app
WORKDIR /app

#
COPY . .

# Install dependencies
RUN yarn install

#
EXPOSE 3000

#
CMD ["yarn", "dev"]
