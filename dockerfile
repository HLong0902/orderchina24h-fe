# Sử dụng Node image để build ứng dụng
FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Use Nginx as the base image
FROM nginx:latest

# Copy Angular build to Nginx static folder
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
