# Capstone Project
 CSCI6806.V1 Computer Science Graduate Capstone Project

## Docker Setup

This repository includes a Docker-based workflow that runs the backend API and the built frontend with a single command.

### Prerequisites

- Docker
- Docker Compose v2

### Running the Stack

1. Build and start the service in the background:

   ```bash
   docker compose up --build -d
   ```

2. Access the applications:

   - Backend API: http://localhost:5001
   - Frontend UI: http://localhost:4173

Environment variables for the backend are stored in `backend.node/.env`. Update this file if you need to target a different database host or change credentials. The Docker setup expects your MySQL instance to already be running and reachable at the host defined in that file.
