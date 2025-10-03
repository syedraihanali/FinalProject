# Dockerfile for combined backend and frontend service
FROM node:20-slim AS base

WORKDIR /app

# Install system dependencies including MariaDB server
RUN apt-get update \
    && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        bash \
        mariadb-server \
        gosu \
    && rm -rf /var/lib/apt/lists/*

# Install backend dependencies
COPY backend.node/package*.json backend.node/
RUN cd backend.node \
    && npm install --production

# Install frontend dependencies
COPY frontend/package*.json frontend/
RUN cd frontend \
    && npm install

# Copy application source
COPY backend.node backend.node
COPY frontend frontend

# Build frontend for production
RUN cd frontend \
    && npm run build

# Install a lightweight static server for the built frontend
RUN npm install -g serve@14

ENV FRONTEND_PORT=4173
ENV DB_HOST=127.0.0.1
ENV DB_USER=clinic_user
ENV DB_PASSWORD=clinic_pass
ENV DB_NAME=clinic

EXPOSE 5001 4173

COPY docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

CMD ["./docker-entrypoint.sh"]
