define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenIdConnectConfiguration = (function () {
        function OpenIdConnectConfiguration() {
            this.setDefaults();
        }
        OpenIdConnectConfiguration.prototype.setDefaults = function () {
            var authority = "http://localhost:5000";
            var host = "https://zamboni-app.azurewebsites.net";
            this.loginRedirectModuleId = "home";
            this.logoutRedirectModuleId = "home";
            this.userManagerSettings = {
                authority: authority,
                client_id: "Aurelia.OpenIdConnect",
                filterProtocolClaims: true,
                loadUserInfo: true,
                post_logout_redirect_uri: host + "/signout-oidc",
                redirect_uri: host + "/signin-oidc",
                response_type: "id_token token",
                scope: "openid email roles profile",
                silent_redirect_uri: host + "/signin-oidc",
            };
        };
        return OpenIdConnectConfiguration;
    }());
    exports.default = OpenIdConnectConfiguration;
});
//# sourceMappingURL=open-id-connect-configuration.js.map