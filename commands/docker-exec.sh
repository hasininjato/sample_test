#!/bin/bash

# Get the script's directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Load variables from the .env file located one level up
ENV_FILE="$SCRIPT_DIR/../.env"

if [ -f "$ENV_FILE" ]; then
    set -a
    source "$ENV_FILE"
    set +a
else
    echo "Error: .env file not found at $ENV_FILE"
    exit 1
fi

docker exec -it $APP_CONTAINER_NAME bash -c "cd /var/www/html/backend && source venv/bin/activate && bash --rcfile <(echo 'source venv/bin/activate')"