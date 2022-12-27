import parse from './parsers.js';
import diffConstructor from './diffConstructor.js';
import format from './formatters/format.js';

/* const genDiff = (filepath1, filepath2) => {
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
}; */
/* const constructor = (data1, data2, key) => {
  if (!_.has(data1, key) && _.has(data2, key)) {
    return { key, type: 'added', value: data2[key] };
  }
  if (_.has(data1, key) && !_.has(data2, key)) {
    return { key, type: 'removed', value: data1[key] };
  }
  if (_.isEqual(data1[key], data2[key])) {
    return { key, type: 'unchanged', value: data1[key] };
  }
  if (!_.isPlainObject(data1[key]) || !_.isPlainObject(data2[key])) {
    return {
      key,
      type: 'updated',
      from: data1[key],
      to: data2[key],
    };
  }
  const childrenKeys = _.union(Object.keys(data1[key]), Object.keys(data2[key]));
  const keysSorted = _.sortBy(childrenKeys);
  const children = keysSorted.map((childKey) => constructor(data1[key], data2[key], childKey));
  return { key, type: 'nested', children };
}; */

/* const diffConstructor = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const allKeysSorted = _.sortBy(allKeys);
  return allKeysSorted.map((key) => {
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, type: 'unchanged', value: data1[key] };
    }
    if (!_.isPlainObject(data1[key]) || !_.isPlainObject(data2[key])) {
      return {
        key,
        type: 'updated',
        from: data1[key],
        to: data2[key],
      };
    }
    const children = diffConstructor(data1[key], data2[key]);
    return { key, type: 'nested', children };
  });
}; */

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const file1 = parse(filepath1);
  const file2 = parse(filepath2);
  const diff = diffConstructor(file1, file2);
  return format(diff, formatType);
};

export default genDiff;
