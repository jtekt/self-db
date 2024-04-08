FROM oven/bun:1.0.36

WORKDIR /usr/src/app

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

EXPOSE 3000
CMD [ "bun", "run", "start" ]
