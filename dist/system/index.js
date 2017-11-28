System.register(["./open-id-connect", "./open-id-connect-roles", "./plugin"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var open_id_connect_1, open_id_connect_roles_1, plugin_1;
    return {
        setters: [
            function (open_id_connect_1_1) {
                open_id_connect_1 = open_id_connect_1_1;
            },
            function (open_id_connect_roles_1_1) {
                open_id_connect_roles_1 = open_id_connect_roles_1_1;
            },
            function (plugin_1_1) {
                plugin_1 = plugin_1_1;
            }
        ],
        execute: function () {
            exports_1("OpenIdConnect", open_id_connect_1.OpenIdConnect);
            exports_1("OpenIdConnectRoles", open_id_connect_roles_1.OpenIdConnectRoles);
            exports_1("configure", plugin_1.configure);
        }
    };
});
