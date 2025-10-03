# Capstone Project
 CSCI6806.V1 Computer Science Graduate Capstone Project

## Docker Setup

This repository includes a Docker-based workflow that runs the backend API, a bundled MySQL-compatible database, and the built frontend with a single command.

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

The container image now embeds a MariaDB instance that is automatically initialized with the `clinic` database schema and a dedicated application user. No external database service is required.

### Default credentials

The backend connects to the in-container database using the following defaults:

| Variable      | Default        | Description                         |
| ------------- | -------------- | ----------------------------------- |
| `DB_HOST`     | `127.0.0.1`    | Internal database host              |
| `DB_NAME`     | `clinic`       | Database name                       |
| `DB_USER`     | `clinic_user`  | Database user created at start-up   |
| `DB_PASSWORD` | `clinic_pass`  | Password for `clinic_user`          |

Override these variables at container runtime if you need to supply different credentials.
