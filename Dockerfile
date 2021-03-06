# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY dist/prod /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]