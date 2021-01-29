FROM node:current-alpine as build
RUN mkdir -p /home/gs/front
WORKDIR /home/gs/front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


#production build
FROM nginx:alpine
COPY --from=build /home/gs/front/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
