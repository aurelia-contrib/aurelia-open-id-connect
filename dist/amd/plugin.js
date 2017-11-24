define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-configuration", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_configuration_1, open_id_connect_logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(frameworkConfig, callback) {
        frameworkConfig.globalResources([
            aurelia_framework_1.PLATFORM.moduleName("./open-id-connect-user-block"),
            aurelia_framework_1.PLATFORM.moduleName("./open-id-connect-user-debug"),
        ]);
        var logger = frameworkConfig.container.get(open_id_connect_logger_1.default);
        logger.debug("Configuring the OpenId Connect Client");
        var openIdConnectConfig = new open_id_connect_configuration_1.default();
        callback(openIdConnectConfig);
        var userManagerSettings = openIdConnectConfig.userManagerSettings;
        var userManager = new oidc_client_1.UserManager(userManagerSettings);
        frameworkConfig.container
            .registerInstance(oidc_client_1.UserManager, userManager);
        frameworkConfig.container
            .registerInstance(open_id_connect_configuration_1.default, openIdConnectConfig);
        frameworkConfig.container
            .registerInstance(Window, window);
        logger.debug("Configured the OpenId Connect Client");
    }
    exports.default = default_1;
});
//# sourceMappingURL=plugin.js.map