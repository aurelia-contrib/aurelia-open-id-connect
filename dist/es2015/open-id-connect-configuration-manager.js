const defaultClientUri = 'https://localhost:9000';
export default class {
    constructor(dto) {
        this._loginRedirectRoute = '/';
        this._logoutRedirectRoute = '/';
        this._userManagerSettings = {
            authority: 'https://localhost:5000',
            client_id: 'Aurelia.OpenIdConnect',
            loadUserInfo: true,
            post_logout_redirect_uri: `${defaultClientUri}/signout-oidc`,
            redirect_uri: `${defaultClientUri}/signin-oidc`,
            response_type: 'id_token token',
            scope: 'openid email roles profile',
            silent_redirect_uri: `${defaultClientUri}/signin-oidc`,
        };
        if (!dto) {
            return;
        }
        Object.keys(dto)
            .filter((key) => dto[key] !== undefined && dto[key] !== null)
            .forEach((key) => {
            this.ensureRouteValueBeginsWithSlash(key, dto[key]);
            this['_' + key] = dto[key];
        });
        if (!dto.userManagerSettings) {
            return;
        }
        Object.keys(dto.userManagerSettings).forEach((k) => {
            this.userManagerSettings[k] = dto.userManagerSettings[k];
        });
    }
    get loginRedirectRoute() {
        return this._loginRedirectRoute;
    }
    get logoutRedirectRoute() {
        return this._logoutRedirectRoute;
    }
    get unauthorizedRedirectRoute() {
        return this._unauthorizedRedirectRoute;
    }
    get logLevel() {
        return this._logLevel;
    }
    get userManagerSettings() {
        return this._userManagerSettings;
    }
    get redirectUri() {
        return this._userManagerSettings.redirect_uri;
    }
    get postLogoutRedirectUri() {
        return this._userManagerSettings.post_logout_redirect_uri;
    }
    ensureRouteValueBeginsWithSlash(key, val) {
        if (key.endsWith('Route') && !val.startsWith('/')) {
            const message = `The configured "${key}" must begin with a slash`;
            throw new RangeError(message);
        }
    }
}
//# sourceMappingURL=open-id-connect-configuration-manager.js.map