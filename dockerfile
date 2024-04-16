FROM node:18-alpine

WORKDIR /app
COPY . .
#ARG BASE_URL
#ENV BASE_URL=$BASE_URL
RUN npm install
#RUN npm run build
EXPOSE 80
CMD ["npm", "run", "dev"]
