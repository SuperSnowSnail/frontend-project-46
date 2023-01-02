import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import parse from './parsers.js';
import diffConstructor from './diffConstructor.js';
import format from './formatters/index.js';

const getRawData = (filepath) => {
  const fullPath = path.resolve(cwd(), filepath);
  return readFileSync(fullPath, 'utf-8');
};

const getExtention = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const rawData1 = getRawData(filepath1);
  const rawData2 = getRawData(filepath2);
  const extName1 = getExtention(filepath1);
  const extName2 = getExtention(filepath2);
  const parsedObj1 = parse(rawData1, extName1);
  const parsedObj2 = parse(rawData2, extName2);
  const diff = diffConstructor(parsedObj1, parsedObj2);
  return format(diff, formatName);
};

export default genDiff;
