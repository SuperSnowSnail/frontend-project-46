import _ from 'lodash';

const diffConstructor = (data1, data2) => {
  const allKeys = _.union(Object.keys(data1), Object.keys(data2));
  const allKeysSorted = _.sortBy(allKeys);
  return allKeysSorted.map((key) => {
    let singleDiff = {};
    if (!_.has(data1, key) && _.has(data2, key)) {
      singleDiff = { key, type: 'added', value: data2[key] };
    } else if (_.has(data1, key) && !_.has(data2, key)) {
      singleDiff = { key, type: 'removed', value: data1[key] };
    } else if (_.isEqual(data1[key], data2[key])) {
      singleDiff = { key, type: 'unchanged', value: data1[key] };
    } else if (!_.isPlainObject(data1[key]) || !_.isPlainObject(data2[key])) {
      singleDiff = {
        key,
        type: 'updated',
        from: data1[key],
        to: data2[key],
      };
    } else {
      const children = diffConstructor(data1[key], data2[key]);
      singleDiff = { key, type: 'nested', children };
    }

    return singleDiff;
  });
};

export default diffConstructor;
