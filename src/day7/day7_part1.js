/* eslint-disable max-classes-per-file */
const fs = require('fs');
const path = require('path');

class Directory {
  constructor(name, parent, children) {
    this.name = name;
    this.parent = parent;
    this.children = children;
  }

  size() {
    return this.children.reduce((total, child) => total + child.size(), 0);
  }
}

class File {
  constructor(name, fileSize) {
    this.name = name;
    this.fileSize = fileSize;
  }

  size() {
    return this.fileSize;
  }
}

function input(inputFile) {
  return fs
    .readFileSync(path.resolve(__dirname, inputFile), 'utf-8')
    .replaceAll('\r', '');
}

function commands(commandLineInput) {
  return commandLineInput.split('\n').filter((line) => line.match(/^\$/));
}

function isChangeDir(line) {
  return line.match(/^\$\s*cd/) != null;
}

function isListCommand(line) {
  return line === '$ ls';
}

function dirName(cdCommand) {
  return cdCommand.match(/^\$\s+cd\s+([\w/.]+)/)[1];
}

function createFile(line) {
  // eslint-disable-next-line no-unused-vars
  const [_, fileSize, fileName] = line.match(/^(\d+)\s+([\w.]+)/);
  return new File(fileName, parseInt(fileSize, 10));
}

function fileTree(commandLineInput) {
  let cwd = null;
  const lines = commandLineInput.split('\n');
  lines.forEach((line) => {
    if (isChangeDir(line) && dirName(line) === '/') {
      cwd = new Directory('/', null, []);
    } else if (isChangeDir(line)) {
      if (dirName(line) === '..') cwd = cwd.parent;
      else {
        cwd = cwd.children.find((dir) => dir.name === dirName(line));
      }
    } else if (!isListCommand(line)) {
      let newFileOrDir;
      if (line.startsWith('dir')) {
        newFileOrDir = new Directory(line.split(' ')[1], cwd, []);
      } else {
        newFileOrDir = createFile(line);
      }
      if (
        cwd.children.filter((child) => child.name === newFileOrDir.name)
          .length === 0
      ) {
        cwd.children.push(newFileOrDir);
      }
    }
  });
  let root = cwd;
  while (cwd.parent != null) {
    root = cwd.parent;
  }
  return { root };
}

function totalSizes(inputFile) {
  const { directories } = fileTree(input(inputFile));
  return Object.values(directories)
    .filter((dir) => dir.size() < 100000)
    .reduce((acc, cur) => acc + cur.size(), 0);
}

// console.log(
//   'The total sizes of directories w/size less than 100000 is:',
//   totalSizes('./real_input.txt'),
// );

module.exports = {
  totalSizes,
  input,
  fileTree,
  commands,
  Directory,
  File,
  isChangeDir,
  isListCommand,
  dirName,
  createFile,
};
