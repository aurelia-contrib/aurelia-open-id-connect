define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenIdConnectRoles;
    (function (OpenIdConnectRoles) {
        OpenIdConnectRoles[OpenIdConnectRoles["Everyone"] = 0] = "Everyone";
        OpenIdConnectRoles[OpenIdConnectRoles["Anonymous"] = 1] = "Anonymous";
        OpenIdConnectRoles[OpenIdConnectRoles["Authorized"] = 2] = "Authorized";
        OpenIdConnectRoles[OpenIdConnectRoles["Administrator"] = 3] = "Administrator";
    })(OpenIdConnectRoles || (OpenIdConnectRoles = {}));
    exports.default = OpenIdConnectRoles;
});
//# sourceMappingURL=open-id-connect-roles.js.map