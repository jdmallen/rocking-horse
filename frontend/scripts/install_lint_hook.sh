#!/bin/bash

# Get the absolute path of the precommit hook script
PRECOMMIT_HOOK="$(realpath scripts/precommit_eslint_hook.sh)"

# Create a symbolic link in the .git/hooks directory
ln -s -f "$PRECOMMIT_HOOK" "$(git rev-parse --show-toplevel)/.git/hooks/pre-commit"

# Make the pre-commit hook executable
chmod +x "$(git rev-parse --show-toplevel)/.git/hooks/pre-commit"
