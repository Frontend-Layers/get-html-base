# get-html-base

Get base infrastructure by command line for frontend templates, node apps etc.

## Features

- deploy [html-base](https://github.com/andreymatin/html-base) by command line
- infrastructure for development JS libraries and Web Components 
- deploy [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)
- deploy [node-frontend-config](https://github.com/andreymatin/node-frontend-config)

## Installation

```shell
npx get-html-base project-name
```

## Configuration 

Configuration options depend of keys, described below


### Commandline switches

- without keys - deploy [html-base](https://github.com/andreymatin/html-base) package
- -js - deploy [html-base](https://github.com/andreymatin/html-base) with JS profile oriented on JavaScript libraries and Web Components development
- -node - deploy node server kickstarter with Express/Nodemon etc. [node-frontend-config](https://github.com/andreymatin/node-frontend-config)
- -h5bp - deploy [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate)

## Test

node ./bin project-name

## License

MIT