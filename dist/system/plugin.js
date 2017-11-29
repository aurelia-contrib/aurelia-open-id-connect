System.register(["aurelia-framework", "oidc-client", "./open-id-connect-configuration", "./open-id-connect-configuration-manager", "./open-id-connect-factory", "./open-id-connect-logger"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function default_1(frameworkConfig, callback, factory) {
        if (!factory) {
            factory = new open_id_connect_factory_1.default();
        }
        frameworkConfig.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-user-block'),
            aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-user-debug'),
            aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-navigation-filter'),
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
    exports_1("default", default_1);
    var aurelia_framework_1, oidc_client_1, open_id_connect_configuration_1, open_id_connect_configuration_manager_1, open_id_connect_factory_1, open_id_connect_logger_1, retrieveUserlandConfig;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (oidc_client_1_1) {
                oidc_client_1 = oidc_client_1_1;
            },
            function (open_id_connect_configuration_1_1) {
                open_id_connect_configuration_1 = open_id_connect_configuration_1_1;
            },
            function (open_id_connect_configuration_manager_1_1) {
                open_id_connect_configuration_manager_1 = open_id_connect_configuration_manager_1_1;
            },
            function (open_id_connect_factory_1_1) {
                open_id_connect_factory_1 = open_id_connect_factory_1_1;
            },
            function (open_id_connect_logger_1_1) {
                open_id_connect_logger_1 = open_id_connect_logger_1_1;
            }
        ],
        execute: function () {
            retrieveUserlandConfig = function (callback) {
                var config = new open_id_connect_configuration_1.default();
                if (!callback || callback.length > 1) {
                    return config;
                }
                if (callback.length === 0) {
                    config = callback();
                    return config;
                }
                callback(config);
                return config;
            };
        }
    };
});
//# sourceMappingURL=plugin.js.map