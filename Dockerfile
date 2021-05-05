FROM --platform=linux/amd64 node:16-alpine

RUN apk add --no-cache dumb-init

WORKDIR /workspace

COPY --chown=node:node package.json ./
COPY --chown=node:node yarn.lock ./
COPY --chown=node:node .yarnrc .
COPY --chown=node:node src/ src/

ENV NODE_ENV production

RUN yarn install --frozen-lockfile --link-duplicates --ignore-scripts --non-interactive --production

ENV PORT 2114
EXPOSE 2114

USER node

CMD [ "dumb-init", "yarn", "start", "-p", "2114" ]