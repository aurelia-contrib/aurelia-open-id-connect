System.register(["oidc-client", "./open-id-connect-configuration-manager", "./open-id-connect-logger"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var oidc_client_1, open_id_connect_configuration_manager_1, open_id_connect_logger_1, OpenIdConnectFactory;
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
            OpenIdConnectFactory = /** @class */ (function () {
                function OpenIdConnectFactory() {
                }
                OpenIdConnectFactory.prototype.createOpenIdConnectConfiguration = function (dto) {
                    return new open_id_connect_configuration_manager_1.OpenIdConnectConfigurationManager(dto);
                };
                OpenIdConnectFactory.prototype.createOpenIdConnectLogger = function (level) {
                    return new open_id_connect_logger_1.OpenIdConnectLogger(level);
                };
                OpenIdConnectFactory.prototype.createUserManager = function (settings) {
                    return new oidc_client_1.UserManager(settings);
                };
                return OpenIdConnectFactory;
            }());
            exports_1("OpenIdConnectFactory", OpenIdConnectFactory);
        }
    };
});
