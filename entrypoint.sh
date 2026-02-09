#!bin/bash

set -e

npm run migrate:up

exec npm run start:debug
