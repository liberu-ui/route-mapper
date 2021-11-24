import MissingParam from './MissingParam.js';

class Params {
  constructor(params) {
    this.params = typeof params === 'object'
      ? JSON.parse(JSON.stringify(params))
      : [params];
  }

  get(param) {
    const isOptional = /\?\}$/gi.test(param);
    const key = param.replace(/\{|\}/gi, '')
      .replace(/\?$/, '');

    const value = Array.isArray(this.params)
      ? this.params.shift()
      : this.params[key]?.id ?? this.params[key];

    if (typeof value === 'undefined' && !isOptional) {
      throw new MissingParam(key);
    }

    return value ?? '';
  }
}

export default Params;
