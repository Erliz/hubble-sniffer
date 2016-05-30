FROM node:6

MAINTAINER Stanislav Vetlovskiy <mrerliz@gmail.com>

ENV PATH                /app/node_modules/.bin:$PATH
ENV NODE_ENV            prod
ENV APP_DATA_URL        ''
ENV APP_DB_NAME         test
ENV APP_DB_URL          'http://localhost:8086/'
ENV APP_DB_TAGS         ''
ENV APP_DB_MEASUREMENT  ''
ENV APP_TIMEOUT         60000

RUN mkdir -p /app
WORKDIR /app

COPY package.json .
RUN npm install --production --unsafe-perm
COPY . .

VOLUME ["/app", "/app/node_modules"]

CMD ["npm", "start"]
