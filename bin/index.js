#! /usr/bin/env node

if (process.argv[2] === 'init' || process.argv[2] === 'i') {
  var shell = require("shelljs");
  shell.exec("git clone https://github.com/andreymatin/html-initial-bundle.git");
} else {
  console.log(`
    Available commands:
    init, i: get html-initial-bundle package

    Example:
    gethtml init

  `);
}
