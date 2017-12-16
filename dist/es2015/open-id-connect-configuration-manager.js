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
            this['_' + key] = dto[key];
        });
        if (!dto.userManagerSettings) {
            return;
        }
        Object.keys(dto.userManagerSettings).forEach((k) => {
            this.userManagerSettings[k] = dto.userManagerSettings[k];
        });
    }
    ensureSlash(s) {
        return s.charAt(0) === "/" ? s : "/" + s;
    }
    get loginRedirectRoute() {
        return this.ensureSlash(this._loginRedirectRoute);
    }
    get logoutRedirectRoute() {
        return this.ensureSlash(this._logoutRedirectRoute);
    }
    get unauthorizedRedirectRoute() {
        return this.ensureSlash(this._unauthorizedRedirectRoute);
    }
    get logLevel() {
        return this._logLevel;
    }
    get userManagerSettings() {
        return this._userManagerSettings;
    }
    get redirectUri() {
        return this.ensureSlash(this._userManagerSettings.redirect_uri);
    }
    get postLogoutRedirectUri() {
        return this.ensureSlash(this._userManagerSettings.post_logout_redirect_uri);
    }
}
//# sourceMappingURL=open-id-connect-configuration-manager.js.map