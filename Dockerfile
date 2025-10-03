# Dockerfile for combined backend and frontend service
FROM node:18-slim AS base

WORKDIR /app

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

EXPOSE 5001 4173

CMD ["sh", "-c", "node backend.node/server.js & exec serve -s frontend/dist -l \"${FRONTEND_PORT:-4173}\""]
