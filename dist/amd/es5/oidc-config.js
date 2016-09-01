"use strict";

define(["require", "exports"], function (require, exports) {
    "use strict";

    var isDevelopment = window.location.host.startsWith("localhost");
    var authority = isDevelopment ? "http://localhost:12345" : "https://zamboni-auth.azurewebsites.net";
    var host = isDevelopment ? "http://localhost:9000" : "https://zamboni-app.azurewebsites.net";
    var oidcConfig = {
        LoginRedirectModuleId: "login",
        LogoutRedirectModuleId: "login",
        UserManagerSettings: {
            authority: authority,
            client_id: "Aurelia.OidcClientJs",
            post_logout_redirect_uri: host + "/signout-oidc",
            redirect_uri: host + "/signin-oidc",
            response_type: "id_token token",
            scope: "openid email roles profile",
            filterProtocolClaims: true,
            loadUserInfo: true
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = oidcConfig;
});
//# sourceMappingURL=oidc-config.js.map