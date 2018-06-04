#!/usr/bin/env node

const process = require('process');
const path = require('path');
const fs = require('fs');
const ribs = require('./ribs');

let arguments = process.argv.splice(2, 2),
    currentPath = process.cwd();

let [input, output] = arguments;

input = path.join(currentPath, input);
output = path.join(currentPath, output);

let fileText = fs.readFileSync(input, 'utf8');
fs.writeFileSync(output, ribs(fileText));