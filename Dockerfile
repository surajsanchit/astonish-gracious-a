FROM node:10
COPY /app package.json
WORKDIR /app
COPY /app .
RUN npm install
CMD npm run-script start
EXPOSE 3000