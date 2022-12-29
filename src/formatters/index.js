import plain from './plain.js';
import stylish from './stylish.js';

const format = (diff, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unsupported format type (${formatName})! [Supported: stylish, plain, json]`);
  }
};

export default format;
