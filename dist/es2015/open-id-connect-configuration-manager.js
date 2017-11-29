const defaultClientUri = 'https://localhost:9000';
export default class {
    constructor(dto) {
        this._loginRedirectModuleId = '/';
        this._logoutRedirectModuleId = '/';
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
        Object.keys(dto).forEach((k) => {
            this['_' + k] = dto[k];
        });
        if (!dto.userManagerSettings) {
            return;
        }
        Object.keys(dto.userManagerSettings).forEach((k) => {
            this.userManagerSettings[k] = dto.userManagerSettings[k];
        });
    }
    get loginRedirectModuleId() {
        return this._loginRedirectModuleId;
    }
    get logoutRedirectModuleId() {
        return this._logoutRedirectModuleId;
    }
    get unauthorizedRedirectModuleId() {
        return this._unauthorizedRedirectModuleId;
    }
    get logLevel() {
        return this._logLevel;
    }
    get userManagerSettings() {
        return this._userManagerSettings;
    }
    get redirectUri() {
        const value = this._userManagerSettings.redirect_uri;
        if (!value) {
            throw new Error('The UserManagerSettings.redirect_uri is required.');
        }
        return value;
    }
    get postLogoutRedirectUri() {
        const value = this._userManagerSettings.post_logout_redirect_uri;
        if (!value) {
            throw new Error('The UserManagerSettings.post_logout_redirect_uri is required.');
        }
        return value;
    }
}
//# sourceMappingURL=open-id-connect-configuration-manager.js.map