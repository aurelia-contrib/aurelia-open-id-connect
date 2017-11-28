System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaultClientUri, OpenIdConnectConfigurationManager;
    return {
        setters: [],
        execute: function () {
            defaultClientUri = 'https://localhost:9000';
            OpenIdConnectConfigurationManager = /** @class */ (function () {
                function OpenIdConnectConfigurationManager(dto) {
                    var _this = this;
                    // tslint:disable-next-line:variable-name
                    this._loginRedirectModuleId = '/';
                    // tslint:disable-next-line:variable-name
                    this._logoutRedirectModuleId = '/';
                    // tslint:disable-next-line:variable-name
                    this._userManagerSettings = {
                        authority: 'https://localhost:5000',
                        client_id: 'Aurelia.OpenIdConnect',
                        loadUserInfo: true,
                        post_logout_redirect_uri: defaultClientUri + "/signout-oidc",
                        redirect_uri: defaultClientUri + "/signin-oidc",
                        response_type: 'id_token token',
                        scope: 'openid email roles profile',
                        silent_redirect_uri: defaultClientUri + "/signin-oidc",
                    };
                    if (!dto) {
                        return;
                    }
                    Object.keys(dto).forEach(function (k) {
                        _this['_' + k] = dto[k];
                    });
                    if (!dto.userManagerSettings) {
                        return;
                    }
                    Object.keys(dto.userManagerSettings).forEach(function (k) {
                        // Use a type assertion to suppress the implicty any error.
                        // Element implicitly has an 'any' type because type 'UserManagerSettings' has no index signature.
                        _this.userManagerSettings[k] = dto.userManagerSettings[k];
                    });
                }
                Object.defineProperty(OpenIdConnectConfigurationManager.prototype, "loginRedirectModuleId", {
                    get: function () {
                        return this._loginRedirectModuleId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OpenIdConnectConfigurationManager.prototype, "logoutRedirectModuleId", {
                    get: function () {
                        return this._logoutRedirectModuleId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OpenIdConnectConfigurationManager.prototype, "unauthorizedRedirectModuleId", {
                    get: function () {
                        return this._unauthorizedRedirectModuleId;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OpenIdConnectConfigurationManager.prototype, "logLevel", {
                    get: function () {
                        return this._logLevel;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OpenIdConnectConfigurationManager.prototype, "userManagerSettings", {
                    get: function () {
                        return this._userManagerSettings;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OpenIdConnectConfigurationManager.prototype, "redirectUri", {
                    get: function () {
                        return this._userManagerSettings.redirect_uri;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(OpenIdConnectConfigurationManager.prototype, "postLogoutRedirectUri", {
                    get: function () {
                        return this._userManagerSettings.post_logout_redirect_uri;
                    },
                    enumerable: true,
                    configurable: true
                });
                return OpenIdConnectConfigurationManager;
            }());
            exports_1("OpenIdConnectConfigurationManager", OpenIdConnectConfigurationManager);
        }
    };
});
