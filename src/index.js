import _ from 'lodash';
import { readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';

const genDiff = (filepath1, filepath2) => {
  const parseJson = (filepath) => JSON.parse(readFileSync(path.resolve(cwd(), filepath), 'utf-8'));

  const json1 = parseJson(filepath1);
  const json2 = parseJson(filepath2);
  const allKeysSorted = _.sortBy(_.union(Object.keys(json1), Object.keys(json2)));
  const diffsArray = allKeysSorted.map((key) => {
    const isKeyInJson1 = _.has(json1, key);
    const isKeyInJson2 = _.has(json2, key);
    if (isKeyInJson1 && !isKeyInJson2) {
      return `  - ${key}: ${json1[key]}`;
    }
    if (!isKeyInJson1 && isKeyInJson2) {
      return `  + ${key}: ${json2[key]}`;
    }
    if (isKeyInJson1 && isKeyInJson2 && json1[key] === json2[key]) {
      return `    ${key}: ${json1[key]}`;
    }
    return `  - ${key}: ${json1[key]}\n  + ${key}: ${json2[key]}`;
  });
  return ['{', ...diffsArray, '}'].join('\n');
};

export default genDiff;
