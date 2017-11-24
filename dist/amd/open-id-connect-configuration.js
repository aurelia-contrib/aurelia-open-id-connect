define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenIdConnectConfiguration = (function () {
        function OpenIdConnectConfiguration() {
            this.setDefaults();
        }
        Object.defineProperty(OpenIdConnectConfiguration.prototype, "RedirectUri", {
            get: function () {
                return this.userManagerSettings.redirect_uri;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(OpenIdConnectConfiguration.prototype, "PostLogoutRedirectUri", {
            get: function () {
                return this.userManagerSettings.post_logout_redirect_uri;
            },
            enumerable: true,
            configurable: true
        });
        OpenIdConnectConfiguration.prototype.setDefaults = function () {
            var authority = "https://localhost:5000";
            var clientApp = "https://localhost:9000";
            this.loginRedirectModuleId = "home";
            this.logoutRedirectModuleId = "home";
            this.userManagerSettings = {
                authority: authority,
                client_id: "Aurelia.OpenIdConnect",
                filterProtocolClaims: true,
                loadUserInfo: true,
                post_logout_redirect_uri: clientApp + "/signout-oidc",
                redirect_uri: clientApp + "/signin-oidc",
                response_type: "id_token token",
                scope: "openid email roles profile",
                silent_redirect_uri: clientApp + "/signin-oidc",
            };
        };
        return OpenIdConnectConfiguration;
    }());
    exports.default = OpenIdConnectConfiguration;
});
//# sourceMappingURL=open-id-connect-configuration.js.map