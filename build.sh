#!/usr/bin/env bash
set -euo pipefail
rm -rf dist
mkdir -p dist
cp *.html dist/
cp -R src dist/src
