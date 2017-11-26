define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-configuration-manager", "./open-id-connect-factory", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_configuration_manager_1, open_id_connect_factory_1, open_id_connect_logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(frameworkConfig, callback, factory) {
        if (!factory) {
            factory = new open_id_connect_factory_1.default();
        }
        frameworkConfig.globalResources([
            aurelia_framework_1.PLATFORM.moduleName("./open-id-connect-user-block"),
            aurelia_framework_1.PLATFORM.moduleName("./open-id-connect-user-debug"),
        ]);
        var userConfig = callback();
        var openIdConnectLogger = factory.createOpenIdConnectLogger(userConfig.logLevel);
        frameworkConfig.container
            .registerInstance(open_id_connect_logger_1.default, openIdConnectLogger);
        var userManager = factory.createUserManager(userConfig.userManagerSettings);
        frameworkConfig.container
            .registerInstance(oidc_client_1.UserManager, userManager);
        var openIdConnectConfig = factory.createOpenIdConnectConfiguration(userConfig);
        frameworkConfig.container
            .registerInstance(open_id_connect_configuration_manager_1.default, openIdConnectConfig);
        frameworkConfig.container.registerInstance(Window, window);
    }
    exports.default = default_1;
});
//# sourceMappingURL=plugin.js.map