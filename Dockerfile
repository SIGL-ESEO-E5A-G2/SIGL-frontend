FROM node:16-alpine

WORKDIR /app/sigl_front/

COPY package.json /app/sigl_front/
RUN npm install

COPY . /app/sigl_front/
RUN ls -l
CMD ["npm", "run", "dev"]
