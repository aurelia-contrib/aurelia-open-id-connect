define(["require", "exports", "oidc-client", "./open-id-connect-configuration-manager", "./open-id-connect-logger"], function (require, exports, oidc_client_1, open_id_connect_configuration_manager_1, open_id_connect_logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenIdConnectFactory = /** @class */ (function () {
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
    exports.OpenIdConnectFactory = OpenIdConnectFactory;
});
