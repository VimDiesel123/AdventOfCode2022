const {
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
} = require('./day7_part1');

test('Total sizes for test input should be 95437', () => {
  expect(totalSizes('./test_input.txt')).toBe(95437);
});

const knownCommands = [
  '$ cd /',
  '$ ls',
  '$ cd a',
  '$ ls',
  '$ cd e',
  '$ ls',
  '$ cd ..',
  '$ cd ..',
  '$ cd d',
  '$ ls',
];

test('Commands of test input should equal expected', () => {
  expect(commands(input('./test_input.txt'))).toEqual(knownCommands);
});

const j = new File('j', 4060174);
const dlog = new File('d.log', 8033020);
const dext = new File('d.ext', 5626152);
const k = new File('k', 7214296);
const d = new Directory('d', null, [j, dlog, dext, k]);

const i = new File('i', 584);
const e = new Directory('e', null, [i]);

const f = new File('f', 29116);
const g = new File('g', 2557);
const hlst = new File('h.lst', 62596);

const a = new Directory('a', null, [e, f, g, hlst]);

const btxt = new File('b.txt', 14848514);
const cdat = new File('c.dat', 8504156);

const root = new Directory('/', {}, [a, btxt, cdat, d]);

e.parent = a;

d.parent = root;
a.parent = root;

test('File Tree generated for test input should be equal to expected', () => {
  expect(fileTree(input('./test_input.txt')).root).toEqual(root);
});

const isChangeDirCommand = [
  ['$ cd /', true],
  ['4060174 j', false],
  ['$ ls', false],
];

test.each(isChangeDirCommand)(
  'Line: %p  is a cd commands?: %p',
  (line, isCD) => {
    expect(isChangeDir(line)).toBe(isCD);
  },
);

const isLsCommand = [
  ['$ ls', true],
  ['$ cd /', false],
  ['4060174 j', false],
];

test.each(isLsCommand)('Line: %ps is an ls command?: %p', (line, isLS) => {
  expect(isListCommand(line)).toBe(isLS);
});

const dirNames = [
  ['$ cd /', '/'],
  ['$ cd a', 'a'],
  ['$ cd ..', '..'],
];

test.each(dirNames)(
  'Line: %p should result in a dir named: %p',
  (line, directoryName) => {
    expect(dirName(line)).toBe(directoryName);
  },
);

const knownFiles = [
  ['4060174 j', new File('j', 4060174)],
  ['8033020 d.log', new File('d.log', 8033020)],
];

test.each(knownFiles)('The line: %p indicates a file: %p', (line, file) => {
  expect(createFile(line)).toEqual(file);
});

const knownDirSizes = [
  [e, 584],
  [a, 94853],
  [d, 24933642],
  [root, 48381165],
];

test.each(knownDirSizes)(
  'The directory: %p has a file size: %p',
  (dir, size) => {
    expect(dir.size()).toBe(size);
  },
);
