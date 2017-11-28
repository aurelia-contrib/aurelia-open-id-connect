define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var defaultClientUri = 'https://localhost:9000';
    var default_1 = (function () {
        function default_1(dto) {
            var _this = this;
            this._loginRedirectModuleId = '/';
            this._logoutRedirectModuleId = '/';
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
                _this.userManagerSettings[k] = dto.userManagerSettings[k];
            });
        }
        Object.defineProperty(default_1.prototype, "loginRedirectModuleId", {
            get: function () {
                return this._loginRedirectModuleId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(default_1.prototype, "logoutRedirectModuleId", {
            get: function () {
                return this._logoutRedirectModuleId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(default_1.prototype, "unauthorizedRedirectModuleId", {
            get: function () {
                return this._unauthorizedRedirectModuleId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(default_1.prototype, "logLevel", {
            get: function () {
                return this._logLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(default_1.prototype, "userManagerSettings", {
            get: function () {
                return this._userManagerSettings;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(default_1.prototype, "redirectUri", {
            get: function () {
                return this._userManagerSettings.redirect_uri;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(default_1.prototype, "postLogoutRedirectUri", {
            get: function () {
                return this._userManagerSettings.post_logout_redirect_uri;
            },
            enumerable: true,
            configurable: true
        });
        return default_1;
    }());
    exports.default = default_1;
});
//# sourceMappingURL=open-id-connect-configuration-manager.js.map