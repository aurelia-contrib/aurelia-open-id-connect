define(["require", "exports"], function (require, exports) {
    "use strict";
    var OpenIdConfiguration = (function () {
        function OpenIdConfiguration() {
            this.LoginRedirectModuleId = "login";
            this.LogoutRedirectModuleId = "logout";
        }
        return OpenIdConfiguration;
    }());
    exports.OpenIdConfiguration = OpenIdConfiguration;
});
//# sourceMappingURL=open-id-configuration.js.map