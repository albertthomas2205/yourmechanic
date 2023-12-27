FROM node:alpine

WORKDIR /app/frontend

COPY . .

RUN npm install
RUN npm run dev

CMD ["npm","run","dev"]