import _ from 'lodash';
import { getKey, getType, getValue } from './utils.js';

const stringify = (value, currentDepth) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indent = '    '.repeat(depth);
    const bracketIndent = '    '.repeat(depth - 1);
    const lines = Object.entries(currentValue).map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(value, currentDepth);
};

const stylish = (diff) => {
  const iter = (currentNode, depth) => {
    const indent = ' '.repeat(depth * 4 - 2);
    const bracketIndent = '    '.repeat(depth - 1);
    const lines = currentNode.map((node) => {
      const [key, type, value] = [getKey(node), getType(node), getValue(node)];
      let line = '';
      switch (type) {
        case 'added':
          line = `${indent}+ ${key}: ${stringify(value, depth + 1)}`;
          break;
        case 'removed':
          line = `${indent}- ${key}: ${stringify(value, depth + 1)}`;
          break;
        case 'unchanged':
          line = `${indent}  ${key}: ${stringify(value, depth + 1)}`;
          break;
        case 'updated':
          line = [
            `${indent}- ${key}: ${stringify(value[0], depth + 1)}`,
            `${indent}+ ${key}: ${stringify(value[1], depth + 1)}`,
          ].join('\n');
          break;
        case 'nested':
          line = `${indent}  ${key}: ${iter(value, depth + 1)}`;
          break;
        default:
          throw new Error(`Unsupported node type (${type})!`);
      }
      return line;
    });
    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
