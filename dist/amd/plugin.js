define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-configuration-manager", "./open-id-connect-factory", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_configuration_manager_1, open_id_connect_factory_1, open_id_connect_logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var retrieveUserlandConfig = function (callback) {
        var config = {};
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
            aurelia_framework_1.PLATFORM.moduleName("./open-id-connect-user-block"),
            aurelia_framework_1.PLATFORM.moduleName("./open-id-connect-user-debug"),
            aurelia_framework_1.PLATFORM.moduleName("./open-id-connect-navigation-value-converter"),
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
});
//# sourceMappingURL=plugin.js.map