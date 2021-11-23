import UrlBuilder from './UrlBuilder';
import Params from './Params';
import MissingParam from './MissingParam';

class RouteMapper {
  constructor(appUrl, routes) {
    this.url = new UrlBuilder(appUrl, routes);
  }

  get(name, params = {}, absolute = true) {
    const extractor = new Params(params);

    try {
      return this.url.get(name, absolute)
        .replace(/{([^}]+)}/gi, param => extractor.get(param));
    } catch (error) {
      if (error instanceof MissingParam) {
        throw new Error(`Route Error: "${error.message}" key is required for route "${name}"`);
      } else {
        throw error;
      }
    }
  }
}

export default RouteMapper;
