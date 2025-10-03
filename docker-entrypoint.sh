#!/bin/bash
set -euo pipefail

# Ensure runtime directories exist
mkdir -p /run/mysqld
chown mysql:mysql /run/mysqld
chown -R mysql:mysql /var/lib/mysql

# Initialize MariaDB data directory if needed
if [ ! -d /var/lib/mysql/mysql ]; then
  echo "Initializing MariaDB data directory..."
  mariadb-install-db --user=mysql --datadir=/var/lib/mysql >/dev/null
fi

# Start MariaDB in the background
gosu mysql mysqld_safe --datadir=/var/lib/mysql --socket=/run/mysqld/mysqld.sock &
MYSQL_PID=$!

# Wait for MariaDB to accept connections
TRIES=0
until mariadb-admin ping --silent; do
  TRIES=$((TRIES + 1))
  if [ "$TRIES" -ge 30 ]; then
    echo "MariaDB failed to start." >&2
    exit 1
  fi
  sleep 1
done

echo "MariaDB started."

# Seed database and user if not already done
if [ ! -f /var/lib/mysql/.db_initialized ]; then
  echo "Configuring clinic database..."
  mariadb <<'SQL'
CREATE DATABASE IF NOT EXISTS clinic;
CREATE USER IF NOT EXISTS 'clinic_user'@'%' IDENTIFIED BY 'clinic_pass';
GRANT ALL PRIVILEGES ON clinic.* TO 'clinic_user'@'%';
FLUSH PRIVILEGES;
SQL

  if [ -f /app/backend.node/createtable.sql ]; then
    echo "Applying schema from createtable.sql..."
    mariadb -u"${DB_USER}" -p"${DB_PASSWORD}" "${DB_NAME}" < /app/backend.node/createtable.sql || true
  fi

  touch /var/lib/mysql/.db_initialized
fi

# Start backend server
node backend.node/server.js &
NODE_PID=$!

# Start frontend static server
serve -s frontend/dist -l "${FRONTEND_PORT:-4173}" &
SERVE_PID=$!

# Relay signals
trap 'kill $NODE_PID $SERVE_PID $MYSQL_PID 2>/dev/null || true' TERM INT

wait $NODE_PID
NODE_STATUS=$?
wait $SERVE_PID
SERVE_STATUS=$?
EXIT_CODE=$NODE_STATUS
if [ $SERVE_STATUS -ne 0 ] && [ $SERVE_STATUS -gt $EXIT_CODE ]; then
  EXIT_CODE=$SERVE_STATUS
fi

# Ensure background processes terminate
kill $MYSQL_PID >/dev/null 2>&1 || true
kill $NODE_PID >/dev/null 2>&1 || true
kill $SERVE_PID >/dev/null 2>&1 || true

wait $MYSQL_PID >/dev/null 2>&1 || true
wait $NODE_PID >/dev/null 2>&1 || true
wait $SERVE_PID >/dev/null 2>&1 || true

exit $EXIT_CODE
