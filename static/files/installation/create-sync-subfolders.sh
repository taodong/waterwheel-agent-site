#!/usr/bin/env zsh
set -euo pipefail

# Creates the host folder structure required by deployment/waterwheel/docker-compose.yml bind mounts.
# Usage:
#   ./create-sync-subfolders.sh
#   ./create-sync-subfolders.sh /path/to/sync
# If no path is provided, current directory is used.
# If a path is provided but does not exist, it is created first.

BASE_PATH="${1:-}"

if [[ -z "${BASE_PATH}" ]]; then
  BASE_PATH="$(pwd)"
  echo "No base path provided; using current directory: ${BASE_PATH}"
elif [[ ! -d "${BASE_PATH}" ]]; then
  mkdir -p "${BASE_PATH}"
  echo "Created base path: ${BASE_PATH}"
fi

DIRS=(
  "${BASE_PATH}/agent/instructions"
  "${BASE_PATH}/agent/tasks"
  "${BASE_PATH}/agent/skills"
  "${BASE_PATH}/agent/outputs"
)

for d in "${DIRS[@]}"; do
  mkdir -p "${d}"
  echo "Created: ${d}"
done

echo "Done."




