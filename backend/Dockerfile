FROM node:18-alpine
RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json ./
RUN pnpm install
COPY . .
RUN pnpm build
EXPOSE 4747
CMD ["pnpm", "start:prod"]
