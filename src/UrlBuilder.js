import MissingParam from './MissingParam.js';

class UrlBuilder {
  constructor(appUrl, routes) {
    this.appUrl = appUrl;
    this.routes = routes;
  }

  get(name, absolute) {
    this.validate(name);

    return this.buildDomain(name, absolute)
      + this.routes[name].uri.replace(/^\//, '');
  }

  validate(name) {
    if (typeof name === 'undefined') {
      throw new Error('Route: You must provide a route name');
    }

    if (typeof this.routes[name] === 'undefined') {
      throw new Error(`Route: route "${name}" is not found in the route list`);
    }
  }

  buildDomain(name, absolute) {
    return absolute && process.env.NODE_ENV === 'production'
      ? `${(this.routes[name].domain || this.appUrl).replace(/\/+$/, '')}/`
      : '/';
  }
}

export default UrlBuilder;
