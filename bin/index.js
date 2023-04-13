#! /usr/bin/env node

const { log } = require('console');
const fs = require('fs');
const shell = require("shelljs");

if (process.argv[2]) {
  const os = require("os");
  const { cwd } = require('node:process');

  const name = process.argv[2];

  const tmpDir = os.tmpdir();
  const prefix = ''; //'-' + Date.now();
  const src = `${tmpDir}/html-base${prefix}/`;
  const dest = `${cwd()}/${name}`;

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git. \nRef: https://github.com/git-guides/install-git');
    shell.exit(1);
  } else {
    // Check dest folder
    if (!fs.existsSync(dest)) {

      // Clone
      shell.exec(`git clone https://github.com/andreymatin/html-base.git ${src}`);

      // Copy
      log(`Copy to "${dest}" folder`);
      shell.cp('-R', src, dest);
    } else {
      console.log(`Directory "${dest}" exists!`);
      shell.exit(1);
    }

    // Processing
    log(`Processing...`);
    shell.cd(dest);
    shell.rm('-rf', ['build', 'dist', 'package-lock.json', 'screenshot.png', 'yarn.lock']);

    // Processing - Updated /package.json
    const fileName = dest + '/package.json';
    const file = require(fileName);

    file.name = name;
    file.version = '1.0.0';
    file.description = '';
    file.author = '';

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });

    // Cleaning
    shell.rm('-rf', src);
    log(`Clean temp folder. \nDone.`);
  }
} else {
  log(`
Please add a project name.

Example:
npx get-base project-name
  `);

  shell.exit(1);
}
