import _ from 'lodash';

const diffConstructor = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { key, type: 'unchanged', value: obj1[key] };
    }
    if (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key])) {
      return {
        key,
        type: 'updated',
        from: obj1[key],
        to: obj2[key],
      };
    }
    const children = diffConstructor(obj1[key], obj2[key]);
    return { key, type: 'nested', children };
  });
};

export default diffConstructor;
