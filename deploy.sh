#!/usr/bin/env bash
set -euo pipefail

if ! command -v git >/dev/null 2>&1; then
  echo "git is required for deployment"
  exit 1
fi

if [ ! -d .git ]; then
  echo "Run this script from the project root with git initialized."
  exit 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Switch to main branch before running deploy.sh (current: $CURRENT_BRANCH)."
  exit 1
fi

npm install
npm run typecheck
npm run build

npx --yes gh-pages -d dist

REPO_URL=$(git config --get remote.origin.url || true)
if [ -n "$REPO_URL" ]; then
  echo "Deployed to GitHub Pages."
  echo "If Pages is enabled on this repository, your site URL will be:"
  echo "https://$(basename -s .git "$REPO_URL" | sed 's#.*:##' | tr '/' '.')/"
fi
