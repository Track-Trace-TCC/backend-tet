FROM node:20-slim

RUN apt-get update && apt-get install -y openssl procps

ENV DATABASE_URL_DOCKER="postgresql://postgres:postgres@db:5432/track_e_trace_db?schema=public"
ENV DATABASE_URL_LOCAL="postgresql://postgres:postgres@localhost:5555/track_e_trace_db?schema=public"
ENV RUNNING_IN_DOCKER=true

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]

CMD ["npm", "run", "start:dev"]
