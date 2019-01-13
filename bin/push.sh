#!/bin/bash
set -euo pipefail
IFS=$'\n\t'
HASH=$(git rev-parse HEAD)
PROJECT_NAME=damperio/damper-frontend

docker login -u $DOCKER_USER -p $DOCKER_PASS && docker push $PROJECT_NAME:latest;
docker tag $PROJECT_NAME:latest $PROJECT_NAME:$HASH
docker login -u $DOCKER_USER -p $DOCKER_PASS && docker push $PROJECT_NAME:$HASH;
