# Slack Bot

## Chuck Norris Database API

- [Internet Chuck Norris Database API](http://www.icndb.com/api/)

## ESLint + Prettier

[https://www.39digits.com/configure-prettier-and-eslint-in-visual-studio-code/](https://www.39digits.com/configure-prettier-and-eslint-in-visual-studio-code/)

## Visual Studio debug with node + babel-node

### launch.json

`{ "version": "0.2.0", "configurations": [ { "type": "node", "request": "launch", "name": "Debug", "program": "${workspaceFolder}/src/index.js", "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node", "runtimeArgs": ["--nolazy"], "env": { "BABEL_ENV": "debug" } } ] }`

### .babelrc

`"debug": { "sourceMap": "inline", "retainLines": true }`

## To see it work, write private message to chuck_norris_bot
