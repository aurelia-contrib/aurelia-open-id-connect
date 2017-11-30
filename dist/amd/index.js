define(["require", "exports", "./open-id-connect", "./open-id-connect-configuration", "./open-id-connect-roles", "./plugin", "oidc-client"], function (require, exports, open_id_connect_1, open_id_connect_configuration_1, open_id_connect_roles_1, plugin_1, oidc_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OpenIdConnect = open_id_connect_1.default;
    exports.OpenIdConnectConfiguration = open_id_connect_configuration_1.default;
    exports.OpenIdConnectRoles = open_id_connect_roles_1.default;
    exports.configure = plugin_1.default;
    exports.Log = oidc_client_1.Log;
    exports.WebStorageStateStore = oidc_client_1.WebStorageStateStore;
});
//# sourceMappingURL=index.js.map