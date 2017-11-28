System.register(["oidc-client", "./open-id-connect-configuration-manager", "./open-id-connect-logger"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var oidc_client_1, open_id_connect_configuration_manager_1, open_id_connect_logger_1, default_1;
    return {
        setters: [
            function (oidc_client_1_1) {
                oidc_client_1 = oidc_client_1_1;
            },
            function (open_id_connect_configuration_manager_1_1) {
                open_id_connect_configuration_manager_1 = open_id_connect_configuration_manager_1_1;
            },
            function (open_id_connect_logger_1_1) {
                open_id_connect_logger_1 = open_id_connect_logger_1_1;
            }
        ],
        execute: function () {
            default_1 = (function () {
                function default_1() {
                }
                default_1.prototype.createOpenIdConnectConfiguration = function (dto) {
                    return new open_id_connect_configuration_manager_1.default(dto);
                };
                default_1.prototype.createOpenIdConnectLogger = function (level) {
                    return new open_id_connect_logger_1.default(level);
                };
                default_1.prototype.createUserManager = function (settings) {
                    return new oidc_client_1.UserManager(settings);
                };
                return default_1;
            }());
            exports_1("default", default_1);
        }
    };
});
//# sourceMappingURL=open-id-connect-factory.js.map