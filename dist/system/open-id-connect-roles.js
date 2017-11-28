System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OpenIdConnectRoles;
    return {
        setters: [],
        execute: function () {
            (function (OpenIdConnectRoles) {
                OpenIdConnectRoles[OpenIdConnectRoles["Everyone"] = 0] = "Everyone";
                OpenIdConnectRoles[OpenIdConnectRoles["Anonymous"] = 1] = "Anonymous";
                OpenIdConnectRoles[OpenIdConnectRoles["Authenticated"] = 2] = "Authenticated";
            })(OpenIdConnectRoles || (OpenIdConnectRoles = {}));
            exports_1("default", OpenIdConnectRoles);
        }
    };
});
//# sourceMappingURL=open-id-connect-roles.js.map