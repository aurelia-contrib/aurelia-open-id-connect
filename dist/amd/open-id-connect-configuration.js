define(["require", "exports", "oidc-client"], function (require, exports, oidc_client_1) {
    "use strict";
    var isDevelopment = window.location.host.startsWith("localhost");
    var authority = isDevelopment
        ? "http://localhost:5000"
        : "https://zamboni-auth.azurewebsites.net";
    var host = isDevelopment
        ? "http://localhost:9000"
        : "https://zamboni-app.azurewebsites.net";
    var OpenIdConnectConfiguration = (function () {
        function OpenIdConnectConfiguration() {
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
                silent_redirect_uri: host + "/signin-oidc",
                scope: "openid email roles profile",
                userStore: new oidc_client_1.WebStorageStateStore({
                    prefix: "oidc",
                    store: window.localStorage,
                }),
            };
        }
        return OpenIdConnectConfiguration;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectConfiguration;
});
//# sourceMappingURL=open-id-connect-configuration.js.map