import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each(['.json', '.yml', '.yaml'])('Supported File Extentions Test', (extention) => {
  const filepath1 = getFixturePath(`file1${extention}`);
  const filepath2 = getFixturePath(`file2${extention}`);
  const badpath1 = getFixturePath('file1.txt');
  const badpath2 = getFixturePath('file2.txt');
  const expectedStylish = readFile('expectedStylish.txt');
  const expectedPlain = readFile('expectedPlain.txt');
  const formatErr = new Error('Unsupported format type (style)! [Supported: stylish, plain, json]');
  const extErr = new Error('Unsupported file extention (.txt)! [Supported: .json, .yml, .yaml]');
  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
  expect(() => genDiff(filepath1, filepath2, 'style')).toThrow(formatErr);
  expect(() => genDiff(filepath1, badpath2)).toThrow(extErr);
  expect(() => genDiff(badpath1, filepath2)).toThrow(extErr);
});

test.each([stylish, plain])('Node Type Errors Test', (formatter) => {
  const unknownTypeDiff = [{ key: 'key', type: 'unknown', value: 'value' }];
  const error = new Error('Unsupported node type (unknown)!');
  expect(() => formatter(unknownTypeDiff)).toThrow(error);
});
