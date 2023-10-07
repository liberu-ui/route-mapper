```typescript
import MissingParam from './MissingParam';

/**
 * Params class to handle getting values from an array or object of parameters.
 */
class Params {
  /**
   * Constructs a new instance of Params.
   * @param params - The array or object of parameters.
   */
  constructor(params: object | any[]) {
    /**
     * The array or object of parameters.
     * @private
     */
    this.params = typeof params === 'object'
      ? JSON.parse(JSON.stringify(params))
      : [params];
  }

  /**
   * Gets the value of the specified parameter.
   * @param param - The parameter to get the value for.
   * @returns The value of the parameter.
   * @throws {MissingParam} If the required parameter is missing.
   */
  get(param: string): string {
    /**
     * Indicates whether the parameter is optional.
     * @private
     */
    const isOptional = /\?\}$/gi.test(param);

    /**
     * The key of the parameter.
     * @private
     */
    const key = param.replace(/\{|\}/gi, '').replace(/\?$/, '');

    /**
     * The value of the parameter.
     * @private
     */
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
```