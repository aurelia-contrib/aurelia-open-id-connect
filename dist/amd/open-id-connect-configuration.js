"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["require", "exports", "oidc-client"], function (require, exports, oidc_client_1) {
    "use strict";

    var OpenIdConnectConfiguration = function OpenIdConnectConfiguration() {
        _classCallCheck(this, OpenIdConnectConfiguration);

        this.LoginRedirectModuleId = "login";
        this.LogoutRedirectModuleId = "logout";
        this.UserManagerSettings = {
            userStore: new oidc_client_1.WebStorageStateStore({ store: localStorage })
        };
    };

    exports.OpenIdConnectConfiguration = OpenIdConnectConfiguration;
});
//# sourceMappingURL=open-id-connect-configuration.js.map