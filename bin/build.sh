#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
PROJECT_NAME=damperio/damper-frontend

docker build -t $PROJECT_NAME:latest .
