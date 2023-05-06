#! /usr/bin/env node

const { log } = require('console');
const fs = require('fs');
const shell = require('shelljs');
const os = require('os');
const { cwd } = require('node:process');

let projectName = '';
let projectType = 'html';

for (let i = 2; i < process.argv.length; i++) {
  const item = process.argv[i];
  if (item === '-js') projectType = 'js';
  if (item === '-node') projectType = 'node';
  if (item === '-h5bp') projectType = 'h5bp';
  if (item[0] !== '-') {
    projectName = item;
  }
}

if (!projectName) {
  projectNameError();
}


const tmpDir = os.tmpdir();
const prefix = ''; //'-' + Date.now();
const src = `${tmpDir}/html-base${prefix}/`;
const dest = `${cwd()}/${projectName}`;

switch (projectType) {
  case 'html', 'js':
    deployHtmlBase();
    break;

  case 'node':
    deployNode();
    break;

  case 'h5bp':
    deployH5bp();
    break;


  default:
    deployHtmlBase();
    break;
}


/**
 * Deploy Node templates
 */
function deployH5bp() {

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git. \nRef: https://github.com/git-guides/install-git');
    shell.exit(1);
  } else {

    // Check dest folder
    if (!fs.existsSync(dest)) {

      // Clone
      shell.exec(`git clone https://github.com/h5bp/html5-boilerplate.git ${src}`);

      // Copy
      log(`Copy to '${dest}' folder`);
      shell.cp('-R', src, dest);
    } else {
      log(`Directory '${dest}' exists!`);
      shell.exit(1);
    }

    // Processing
    log(`Processing...`);
    shell.cd(dest);

    // Processing - Updated /package.json
    const fileProjectName = dest + '/package.json';
    const file = require(fileProjectName);

    file.name = projectName;
    file.version = '1.0.0';
    file.description = '';
    file.author = '';

    fs.writeFile(fileProjectName, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });

    // Cleaning
    shell.rm('-rf', src);
    log(`Clean temp folder. \nDone.`);

    shell.rm('-rf', dest + '/.git');
    log(`Clean init folder. \nDone.`);
  }
}

/**
 * Deploy Node templates
 */
function deployNode() {

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git. \nRef: https://github.com/git-guides/install-git');
    shell.exit(1);
  } else {

    // Check dest folder
    if (!fs.existsSync(dest)) {

      // Clone
      shell.exec(`git clone https://github.com/andreymatin/node-frontend-config.git ${src}`);

      // Copy
      log(`Copy to '${dest}' folder`);
      shell.cp('-R', src, dest);
    } else {
      log(`Directory '${dest}' exists!`);
      shell.exit(1);
    }

    // Processing
    log(`Processing...`);
    shell.cd(dest);

    // Processing - Updated /package.json
    const fileProjectName = dest + '/package.json';
    const file = require(fileProjectName);

    file.name = projectName;
    file.version = '1.0.0';
    file.description = '';
    file.author = '';

    fs.writeFile(fileProjectName, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });

    // Cleaning
    shell.rm('-rf', src);
    log(`Clean temp folder. \nDone.`);

    shell.rm('-rf', dest + '/.git');
    log(`Clean init folder. \nDone.`);
  }
}



/**
 * Deploy html-base
 */
function deployHtmlBase() {

  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git. \nRef: https://github.com/git-guides/install-git');
    shell.exit(1);
  } else {

    // Check dest folder
    if (!fs.existsSync(dest)) {

      // Clone
      shell.exec(`git clone https://github.com/andreymatin/html-base.git ${src}`);

      // Copy
      log(`Copy to '${dest}' folder`);
      shell.cp('-R', src, dest);
    } else {
      log(`Directory '${dest}' exists!`);
      shell.exit(1);
    }

    // Processing
    log(`Processing...`);
    shell.cd(dest);
    shell.rm('-rf', ['build', 'dist', 'package-lock.json', 'screenshot.png', 'yarn.lock']);

    // Processing - Updated /package.json
    const fileProjectName = dest + '/package.json';
    const file = require(fileProjectName);

    file.name = projectName;
    file.version = '1.0.0';
    file.description = '';
    file.author = '';

    fs.writeFile(fileProjectName, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
    });

    // Cleaning
    shell.rm('-rf', src);
    log(`Clean temp folder. \nDone.`);

    shell.rm('-rf', dest + '/.git');
    log(`Clean init folder. \nDone.`);

    // JS mode
    if (projectType === 'js') {
      shell.cp(dest + '/.gulp/profiles/js-apps/gulpfile.js', dest + '/gulpfile.js');
      shell.cp(dest + '/.gulp/profiles/js-apps/javascript.js', dest + '/.gulp/javascript.js');
      log(`JS Mode On. \nDone.`);
    }
  }

}

/**
 * Show Error
 */
function projectNameError() {
  log(`Please add a project name.

  Example:
  npx get-html-base project-name
    `);

  shell.exit(1);
}
