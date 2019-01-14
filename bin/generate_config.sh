#!/bin/sh -eu
API_URL_JSON=$(echo $REACT_APP_API_URL)

cat <<EOF
window.REACT_APP_API_URL="$API_URL_JSON";
EOF
