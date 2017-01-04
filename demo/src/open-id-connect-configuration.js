define(["require", "exports", "./environment", "oidc-client"], function (require, exports, environment_1, oidc_client_1) {
    "use strict";
    var oidcConfig = {
        loginRedirectModuleId: "home",
        logoutRedirectModuleId: "home",
        userManagerSettings: {
            accessTokenExpiringNotificationTime: 1,
            authority: environment_1.default.urls.authority,
            automaticSilentRenew: false,
            checkSessionInterval: 10000,
            client_id: "Aurelia.OpenIdConnect",
            filterProtocolClaims: true,
            loadUserInfo: false,
            post_logout_redirect_uri: environment_1.default.urls.host + "/signout-oidc",
            redirect_uri: environment_1.default.urls.host + "/signin-oidc",
            response_type: "id_token token",
            scope: "openid email roles profile",
            silentRequestTimeout: 10000,
            silent_redirect_uri: environment_1.default.urls.host + "/signin-oidc",
            userStore: new oidc_client_1.WebStorageStateStore({
                prefix: "oidc",
                store: window.localStorage,
            }),
        },
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = oidcConfig;
});
//# sourceMappingURL=open-id-connect-configuration.js.map