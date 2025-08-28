#!/bin/bash

# Exit on any error
set -e

# Validate that db_bot.json exists in the current working directory
if [[ ! -f "db_bot.json" ]]; then
    echo "Error: db_bot.json file not found in the current working directory."
    exit 1
fi

# Define repository placeholder URL
REPO_URL="https://github.com/GoldenLabHuji/DBbotUI.git"

# Clone the repository into the current working directory
git clone "$REPO_URL" dbbotUI

# Check if data.csv exists in the current working directory
if [[ ! -f "data.csv" ]]; then
    echo "Error: data.csv file not found in the current working directory."
    exit 1
fi

# Create the target directory in the cloned repo
mkdir -p dbbotUI/src/app/data

# Move db_bot.json and data.csv to the target directory
cp db_bot.json dbbotUI/src/app/data/
cp data.csv dbbotUI/src/app/data/

# Remove the .git directory from the cloned repository
rm -rf dbbotUI/.git
rm -rf dbbotUI/.github
rm -rf dbbotUI/.gitignore

# Success message
echo "Deployment setup complete."
