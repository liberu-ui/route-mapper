/**
 * Represents a URL builder that constructs URLs for a given app URL and routes.
 */
class UrlBuilder {
    /**
     * Creates an instance of the UrlBuilder class.
     * @param {string} appUrl - The base URL of the application.
     * @param {object} routes - The object containing the routes and their details.
     */
    constructor(appUrl: string, routes: any) {
        this.appUrl = appUrl;
        this.routes = routes;
    }

    /**
     * Constructs a URL based on the provided route name and the absolute flag.
     * @param {string} name - The name of the route to construct the URL.
     * @param {boolean} absolute - Flag indicating whether the URL should be absolute or relative.
     * @returns {string} - The constructed URL.
     * @throws {Error} - If the route name is undefined or not found in the route list.
     */
    get(name: string, absolute: boolean): string {
        this.validate(name);

        return this.buildDomain(name, absolute) +
            this.routes[name].uri.replace(/^\//, '');
    }

    /**
     * Validates the route name.
     * @param {string} name - The name of the route to validate.
     * @throws {Error} - If the route name is undefined or not found in the route list.
     */
    validate(name: string): void {
        if (typeof name === 'undefined') {
            throw new Error('Route: You must provide a route name');
        }

        if (typeof this.routes[name] === 'undefined') {
            throw new Error(`Route: route "${name}" is not found in the route list`);
        }
    }

    /**
     * Builds the domain part of the URL based on the provided route name and the absolute flag.
     * @param {string} name - The name of the route to build the domain part for.
     * @param {boolean} absolute - Flag indicating whether the URL should be absolute or relative.
     * @returns {string} - The domain part of the URL.
     */
    buildDomain(name: string, absolute: boolean): string {
        return absolute && process.env.NODE_ENV === 'production'
            ? `${(this.routes[name].domain || this.appUrl).replace(/\/+$/, '')}/`
            : '/';
    }
}

export default UrlBuilder;