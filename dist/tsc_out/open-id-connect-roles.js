define(["require", "exports"], function (require, exports) {
    "use strict";
    (function (OpenIdConnectRoles) {
        OpenIdConnectRoles[OpenIdConnectRoles["Everyone"] = 0] = "Everyone";
        OpenIdConnectRoles[OpenIdConnectRoles["Anonymous"] = 1] = "Anonymous";
        OpenIdConnectRoles[OpenIdConnectRoles["Authorized"] = 2] = "Authorized";
        OpenIdConnectRoles[OpenIdConnectRoles["Administrator"] = 3] = "Administrator";
    })(exports.OpenIdConnectRoles || (exports.OpenIdConnectRoles = {}));
    var OpenIdConnectRoles = exports.OpenIdConnectRoles;
});
//# sourceMappingURL=open-id-connect-roles.js.map