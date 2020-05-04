FROM node:alpine

LABEL key="1.0.0"

# ENV NODE_ENV production

RUN mkdir -p /usr/src/node-app && chown -R node:node /usr/src/node-app

WORKDIR /usr/src/node-app

# COPY package.json yarn.lock ./
COPY package.json .

USER node

RUN echo working


RUN yarn
# --pure-lockfile


COPY --chown=node:node . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/server.js"]
