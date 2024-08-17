FROM node:20.11.1

WORKDIR /nreportapi

RUN apt-get update && apt-get upgrade -y

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["bash", "-c", "sleep 10 && npx prisma migrate dev && npm run start"]