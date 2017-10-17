define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenIdConnectRoles;
    (function (OpenIdConnectRoles) {
        OpenIdConnectRoles[OpenIdConnectRoles["Administrator"] = 0] = "Administrator";
        OpenIdConnectRoles[OpenIdConnectRoles["Everyone"] = 1] = "Everyone";
        OpenIdConnectRoles[OpenIdConnectRoles["Anonymous"] = 2] = "Anonymous";
        OpenIdConnectRoles[OpenIdConnectRoles["Authorized"] = 3] = "Authorized";
    })(OpenIdConnectRoles || (OpenIdConnectRoles = {}));
    exports.default = OpenIdConnectRoles;
});
//# sourceMappingURL=open-id-connect-roles.js.map