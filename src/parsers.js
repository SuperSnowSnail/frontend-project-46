import yaml from 'js-yaml';

const parse = (data, extName) => {
  switch (extName) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file extention (${extName})! [Supported: .json, .yml, .yaml]`);
  }
};

export default parse;
