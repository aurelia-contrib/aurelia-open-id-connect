"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oidc_client_1 = require("oidc-client");
var open_id_connect_configuration_manager_1 = require("./open-id-connect-configuration-manager");
var open_id_connect_logger_1 = require("./open-id-connect-logger");
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
