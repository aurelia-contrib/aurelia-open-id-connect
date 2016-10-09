define(["require", "exports"], function (require, exports) {
    "use strict";
    let isDevelopment = window.location.host.startsWith("localhost");
    let authority = isDevelopment
        ? "http://localhost:12345"
        : "https://zamboni-auth.azurewebsites.net";
    let host = isDevelopment
        ? "http://localhost:9000"
        : "https://zamboni-app.azurewebsites.net";
    const oidcConfig = {
        LoginRedirectModuleId: "home",
        LogoutRedirectModuleId: "home",
        UserManagerSettings: {
            authority: authority,
            client_id: "Aurelia.OpenIdConnect",
            filterProtocolClaims: true,
            loadUserInfo: true,
            post_logout_redirect_uri: `${host}/signout-oidc`,
            redirect_uri: `${host}/signin-oidc`,
            response_type: "id_token token",
            scope: "openid email roles profile",
        },
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = oidcConfig;
});
//# sourceMappingURL=open-id-connect-configuration.js.map