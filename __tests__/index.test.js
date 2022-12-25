import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { describe, expect, test } from '@jest/globals';
import genDiff from '../src/index.js';
import expectedFlat from '../__fixtures__/expectedFlat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('Stylish Tests', () => {
  test('Flat JSON Stylish Test', () => {
    const filepath1 = getFixturePath('flat1.json');
    const filepath2 = getFixturePath('flat2.json');
    const actual = genDiff(filepath1, filepath2);
    const expected = expectedFlat;
    expect(actual).toEqual(expected);
  });

  test('Flat YAML Stylish Test', () => {
    const filepath1 = getFixturePath('flat1.yml');
    const filepath2 = getFixturePath('flat2.yaml');
    const actual = genDiff(filepath1, filepath2);
    const expected = expectedFlat;
    expect(actual).toEqual(expected);
  });
});

test('Unsupported Extention Error Test', () => {
  const filepath1 = getFixturePath('flat1.json');
  const filepath2 = getFixturePath('unsupportedExt.txt');
  const expected = new Error('Unsupported file extention (.txt)! [Supported: .json, .yml, .yaml]');
  expect(() => {
    genDiff(filepath1, filepath2);
  }).toThrow(expected);
});
