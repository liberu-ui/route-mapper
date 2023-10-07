Sure, here is the converted TypeScript code file with the documentation and type annotations added:

```typescript
import UrlBuilder from './UrlBuilder';
import Params from './Params';
import MissingParam from './MissingParam';

/**
 * Represents a RouteMapper that helps in building and manipulating URLs for different routes.
 */
class RouteMapper {
  private url: UrlBuilder;

  /**
   * Creates an instance of RouteMapper.
   * @param appUrl - The base URL of the application.
   * @param routes - An object containing the route names and their corresponding paths.
   */
  constructor(appUrl: string, routes: { [key: string]: string }) {
    this.url = new UrlBuilder(appUrl, routes);
  }

  /**
   * Generates a URL for the specified route name.
   * @param name - The name of the route.
   * @param params - An object containing the route parameters.
   * @param absolute - A boolean indicating whether the generated URL should be absolute or relative.
   * @returns The generated URL for the specified route name.
   * @throws If a required parameter for the route is missing.
   */
  get(name: string, params: { [key: string]: string } = {}, absolute: boolean = true): string {
    const extractor = new Params(params);

    try {
      return this.url.get(name, absolute).replace(/{([^}]+)}/gi, (param) => extractor.get(param));
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
```

Please note that this conversion assumes that the `UrlBuilder`, `Params`, and `MissingParam` classes have already been converted to TypeScript and are compatible with the TypeScript code file provided.