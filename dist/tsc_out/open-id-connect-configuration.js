define(["require", "exports", "oidc-client"], function (require, exports, oidc_client_1) {
    "use strict";
    class OpenIdConnectConfiguration {
        constructor() {
            this.LoginRedirectModuleId = "login";
            this.LogoutRedirectModuleId = "logout";
            this.UserManagerSettings = {
                userStore: new oidc_client_1.WebStorageStateStore({ store: localStorage }),
            };
        }
    }
    exports.OpenIdConnectConfiguration = OpenIdConnectConfiguration;
});
//# sourceMappingURL=open-id-connect-configuration.js.map