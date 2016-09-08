define(["require", "exports"], function (require, exports) {
    "use strict";
    class OpenIdConnectConfiguration {
        constructor() {
            this.LoginRedirectModuleId = "login";
            this.LogoutRedirectModuleId = "logout";
        }
    }
    exports.OpenIdConnectConfiguration = OpenIdConnectConfiguration;
});
//# sourceMappingURL=open-id-connect-configuration.js.map