FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production \
    PORT=5001 \
    DB_HOST=db \
    DB_PORT=3306 \
    DB_USER=clinic_user \
    DB_PASSWORD=clinic_pass \
    DB_NAME=clinic

CMD ["npm", "start"]
