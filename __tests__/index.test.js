import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { describe, expect, test } from '@jest/globals';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Stylish Tests', () => {
  test('JSON Stylish Test', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const actual = genDiff(filepath1, filepath2, 'stylish');
    const expected = expectedStylish;
    expect(actual).toBe(expected);
  });

  test('YAML Stylish Test', () => {
    const filepath1 = getFixturePath('file1.yml');
    const filepath2 = getFixturePath('file2.yaml');
    const actual = genDiff(filepath1, filepath2, 'stylish');
    const expected = expectedStylish;
    expect(actual).toBe(expected);
  });

  test('Default Format Type Test', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const actual = genDiff(filepath1, filepath2);
    const expected = expectedStylish;
    expect(actual).toBe(expected);
  });
});

/* test.each(['.json', '.yml', '.yaml'])('Tests', (extention) => {
  const filepath1 = getFixturePath(`file1${extention}`);
  const filepath2 = getFixturePath(`file2${extention}`);
  expect(genDiff(filepath1, filepath2)).toBe(expectedStylish);
  expect(genDiff(filepath1, filepath2, 'stylish')).toBe(expectedStylish);
}); */

describe('Errors Tests', () => {
  test('Unsupported Extention Error Test', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('unsupportedExt.txt');
    const expected = new Error('Unsupported file extention (.txt)! [Supported: .json, .yml, .yaml]');
    expect(() => {
      genDiff(filepath1, filepath2);
    }).toThrow(expected);
  });

  test('Unsupported Format Type Error Test', () => {
    const filepath1 = getFixturePath('file1.json');
    const filepath2 = getFixturePath('file2.json');
    const expected = new Error('Unsupported format type (style)! [Supported: stylish, plain, json]');
    expect(() => {
      genDiff(filepath1, filepath2, 'style');
    }).toThrow(expected);
  });

  test('Unsupported Node Type Error Test', () => {
    const unknownTypeDiff = [{ key: 'key', type: 'unknown', value: 'value' }];
    const expected = new Error('Unsupported node type (unknown)!');
    expect(() => {
      stylish(unknownTypeDiff);
    }).toThrow(expected);
  });
});
