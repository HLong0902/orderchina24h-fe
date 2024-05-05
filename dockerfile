FROM node:lts-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 80

CMD ["npm", "run", "preview"]