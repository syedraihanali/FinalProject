# Capstone Project
 CSCI6806.V1 Computer Science Graduate Capstone Project

## Docker Setup

This repository now uses Docker Compose to orchestrate the backend API, frontend build, and a MariaDB database as independent services.

### Prerequisites

- Docker
- Docker Compose v2

### Running the stack

1. Build and start all services:

   ```bash
   docker compose up --build -d
   ```

2. Inspect container logs if needed:

   ```bash
   docker compose logs -f
   ```

The stack intentionally keeps all network traffic inside the Compose network and does not publish container ports to the host. If you need host access (for example, to open the frontend in a browser), add the appropriate `ports` mappings to `docker-compose.yml` when running locally.

### Default configuration

The Compose file provisions a MariaDB service and configures the backend with the following defaults:

| Variable       | Default value         | Description                       |
| -------------- | --------------------- | --------------------------------- |
| `DB_HOST`      | `db`                  | Internal database host            |
| `DB_PORT`      | `3306`                | Internal database port            |
| `DB_NAME`      | `clinic`              | Database name                     |
| `DB_USER`      | `clinic_user`         | Database user created at start-up |
| `DB_PASSWORD`  | `clinic_pass`         | Password for `clinic_user`        |
| `JWT_SECRET`   | `super secret secret token jwt` | Default JWT secret for local use |

Override these variables through the Compose file or environment variables to match your deployment environment.

### Frontend build configuration

The frontend image is produced with Vite and compiles against the internal API endpoint `http://backend:5001`. To point the compiled assets at a different backend, set the `VITE_API_URL` build argument when building the frontend service:

```bash
docker compose build --build-arg VITE_API_URL=https://your-api.example.com frontend
```

