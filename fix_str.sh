#!/bin/bash

# Exit on error
set -e

echo "🛠️ Fixing DocuBrain project structure..."

# Step 1: Move virtual environment outside the project
if [ -d "DocuBrain-backend/env" ]; then
  mv DocuBrain-backend/env ../DocuBrain-env
  echo "✅ Moved virtual environment to ../DocuBrain-env"
fi

# Step 2: Rename long-name file
if [ -f "'DocuBrain: Scalable Document Management & Query System'" ]; then
  mv "'DocuBrain: Scalable Document Management & Query System'" DOCUBRAIN_OVERVIEW.md
  echo "✅ Renamed project description file to DOCUBRAIN_OVERVIEW.md"
fi

# Step 3: Restructure folders
mkdir -p backend
mv DocuBrain-backend/main.py backend/ 2>/dev/null || true
mv DocuBrain-backend/* backend/ 2>/dev/null || true
rmdir DocuBrain-backend 2>/dev/null || true

mv backend/frontend ./frontend

# Step 4: Add .gitignore
cat > .gitignore <<EOF
# Python
__pycache__/
*.py[cod]
*.pyo
*.pyd
*.env
.env
env/
venv/
ENV/
# Node
node_modules/
dist/
# OS
.DS_Store
Thumbs.db
EOF
echo "✅ Created .gitignore"

# Step 5: Add a simple README.md if not exists
if [ ! -f README.md ]; then
  cat > README.md <<EOF
# DocuBrain

Scalable Document Management & Query System built with a modern MERN stack frontend and a Python-based backend.

## Structure

- \`backend/\`: Python backend (FastAPI / Flask)
- \`frontend/\`: React frontend (Vite)
- \`DOCUBRAIN_OVERVIEW.md\`: Project overview

## Setup

Instructions coming soon...
EOF
  echo "✅ Created README.md"
fi

echo "✅ All done! Your project structure is now clean and ready 🚀"
