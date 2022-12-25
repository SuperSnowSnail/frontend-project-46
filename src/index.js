import _ from 'lodash';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const allKeysSorted = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  const diffsArray = allKeysSorted.map((key) => {
    const isKeyInFile1 = _.has(file1, key);
    const isKeyInFile2 = _.has(file2, key);
    if (isKeyInFile1 && !isKeyInFile2) {
      return `  - ${key}: ${file1[key]}`;
    }
    if (!isKeyInFile1 && isKeyInFile2) {
      return `  + ${key}: ${file2[key]}`;
    }
    if (isKeyInFile1 && isKeyInFile2 && file1[key] === file2[key]) {
      return `    ${key}: ${file1[key]}`;
    }
    return `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}`;
  });
  return ['{', ...diffsArray, '}'].join('\n');
};

export default genDiff;
