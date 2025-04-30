#!/bin/bash

set -uo pipefail
IFS=$'\n\t'

echo "Linting only the staged hunks of files..."

STAGED_FILES=$(git diff --diff-filter=d --cached --name-only -- '*.ts' '*.tsx' '*.vue')
if [ "$(echo "$STAGED_FILES" | sed '/^$/d' | wc -l)" -eq 0 ]; then
  echo "No staged TS/Vue files found. Skipping linting."
  exit 0
fi

echo "Files with staged changes to be linted:"
echo "$STAGED_FILES" | sed 's/^/  - /'
echo "$STAGED_FILES" | tr '\n' '\0' | xargs -0 -I % sh -c 'git show ":%" | "./frontend/node_modules/.bin/eslint" --config "./frontend/eslint.config.js" --stdin --stdin-filename "%";'
eslint_exit_code=$?

if [ "$eslint_exit_code" -eq 0 ]; then
  echo "Linting passed"
else
  echo "Linting failed!" 1>&2
  exit "$eslint_exit_code"
fi
