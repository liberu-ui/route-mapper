class RouteMapper {
    constructor(appUrl, routes) {
        this.appUrl = appUrl;
        this.routes = routes;
    }

    get(name, params = {}, absolute = true) {
        this.name = name;
        this.params = typeof params !== 'object'
            ? [params]
            : params;
        this.absolute = absolute;
        this.url = this.buildUrl();

        return this.url;
    }

    buildUrl() {
        const url = this.buildDomain()
            + this.routes[this.name].uri.replace(/^\//, '');

        return this.fillParams(url);
    }

    buildDomain() {
        this.validate();

        return this.absolute && process.env.NODE_ENV === 'production'
            ? `${(this.routes[this.name].domain || this.appUrl).replace(/\/+$/, '')}/`
            : '/';
    }

    fillParams(url) {
        return url.replace(
            /{([^}]+)}/gi,
            segment => this.fillParam(segment),
        );
    }

    fillParam(segment) {
        const key = segment.replace(/\{|\}/gi, '')
            .replace(/\?$/, '');

        if (Array.isArray(this.params)) {
            return this.shiftParams(key);
        }

        if (typeof this.params[key] === 'undefined') {
            return this.optionalParam(segment, key);
        }

        return this.params[key].id || this.params[key];
    }

    shiftParams(key) {
        return this.params.length === 0
            ? this.throwMissingKeyError(key)
            : this.params.shift();
    }

    optionalParam(tag, key) {
        return tag.indexOf('?') === -1
            ? this.throwMissingKeyError(key)
            : '';
    }

    validate() {
        if (typeof this.name === 'undefined') {
            throw new Error('Route: You must provide a route name');
        }

        if (typeof this.routes[this.name] === 'undefined') {
            throw new Error(`Route: route "${this.name}" is not found in the route list`);
        }
    }

    throwMissingKeyError(key) {
        throw new Error(`Route Error: "${key}" key is required for route "${this.name}"`);
    }
}

export default RouteMapper;
