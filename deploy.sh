#!/bin/bash

# PRODUCTION
# git checkout master
# git reset --hard
# git pull origin master

# npm i yarn -g
# yarn global add serve
# yarn
# yarn run build
# pm2 start "yarn run start:prod" --name=ZIGAP

# DEVELOPMENT
git checkout develop
git reset --hard
git pull origin develop

npm i yarn -g
yarn global add serve
yarn
yarn run build
pm2 start "yarn run start:dev" --name=ZIGAP
