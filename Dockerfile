FROM nginx:alpine

COPY frontend/index.html frontend/style.css /usr/share/nginx/html/

EXPOSE 80