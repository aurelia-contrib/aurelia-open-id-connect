System.register(["aurelia-framework", "oidc-client", "./open-id-connect-configuration-manager", "./open-id-connect-factory", "./open-id-connect-logger"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(frameworkConfig, callback, factory) {
        if (!factory) {
            factory = new open_id_connect_factory_1.OpenIdConnectFactory();
        }
        // register global resources
        frameworkConfig.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-user-block'),
            aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-user-debug'),
            aurelia_framework_1.PLATFORM.moduleName('./open-id-connect-navigation-value-converter'),
        ]);
        // retrieve user-land configuration
        var userConfig = retrieveUserlandConfig(callback);
        // register configuration
        var configManager = factory.createOpenIdConnectConfiguration(userConfig);
        frameworkConfig.container
            .registerInstance(open_id_connect_configuration_manager_1.OpenIdConnectConfigurationManager, configManager);
        // register logger
        var openIdConnectLogger = factory.createOpenIdConnectLogger(configManager.logLevel);
        frameworkConfig.container
            .registerInstance(open_id_connect_logger_1.OpenIdConnectLogger, openIdConnectLogger);
        // register userManager
        var userManager = factory.createUserManager(configManager.userManagerSettings);
        frameworkConfig.container
            .registerInstance(oidc_client_1.UserManager, userManager);
        // register window
        frameworkConfig.container.registerInstance(Window, window);
    }
    exports_1("configure", configure);
    var aurelia_framework_1, oidc_client_1, open_id_connect_configuration_manager_1, open_id_connect_factory_1, open_id_connect_logger_1, retrieveUserlandConfig;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (oidc_client_1_1) {
                oidc_client_1 = oidc_client_1_1;
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
                return config;
            };
        }
    };
});
