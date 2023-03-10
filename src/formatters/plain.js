import _ from 'lodash';
import { getKey, getType, getValue } from './utils.js';

const formatValueToPlain = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return `${value}`;
};

const plain = (diff) => {
  const iter = (currentNode, previousPath) => {
    const lines = currentNode.map((node) => {
      const [key, type, value] = [getKey(node), getType(node), getValue(node)];
      const currentPath = [...previousPath, key];
      const baseLine = `Property '${currentPath.join('.')}' was ${type}`;
      switch (type) {
        case 'added':
          return `${baseLine} with value: ${formatValueToPlain(value)}`;
        case 'removed':
          return `${baseLine}`;
        case 'unchanged':
          return '';
        case 'updated':
          return `${baseLine}. From ${formatValueToPlain(value[0])} to ${formatValueToPlain(value[1])}`;
        case 'nested':
          return iter(value, currentPath);
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
    });
    return lines.filter((line) => line !== '').join('\n');
  };
  return iter(diff, '');
};

export default plain;
