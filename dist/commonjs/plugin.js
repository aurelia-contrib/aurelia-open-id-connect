"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var oidc_client_1 = require("oidc-client");
var open_id_connect_configuration_1 = require("./open-id-connect-configuration");
var open_id_connect_configuration_manager_1 = require("./open-id-connect-configuration-manager");
var open_id_connect_factory_1 = require("./open-id-connect-factory");
var open_id_connect_logger_1 = require("./open-id-connect-logger");
var retrieveUserlandConfig = function (callback) {
    var config = new open_id_connect_configuration_1.default();
    if (!callback || callback.length > 1) {
        return config;
    }
    if (callback.length === 0) {
        config = callback();
        return config;
    }
    if (callback.length === 1) {
        callback(config);
        return config;
    }
};
function default_1(frameworkConfig, callback, factory) {
    if (!factory) {
        factory = new open_id_connect_factory_1.default();
    }
    frameworkConfig.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-user-block'),
        aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-user-debug'),
        aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-navigation-value-converter'),
    ]);
    var userConfig = retrieveUserlandConfig(callback);
    var configManager = factory.createOpenIdConnectConfiguration(userConfig);
    frameworkConfig.container
        .registerInstance(open_id_connect_configuration_manager_1.default, configManager);
    var openIdConnectLogger = factory.createOpenIdConnectLogger(configManager.logLevel);
    frameworkConfig.container
        .registerInstance(open_id_connect_logger_1.default, openIdConnectLogger);
    var userManager = factory.createUserManager(configManager.userManagerSettings);
    frameworkConfig.container
        .registerInstance(oidc_client_1.UserManager, userManager);
    frameworkConfig.container.registerInstance(Window, window);
}
exports.default = default_1;
//# sourceMappingURL=plugin.js.map