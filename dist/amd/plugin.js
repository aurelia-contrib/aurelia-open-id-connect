define(["require", "exports", "oidc-client", "./open-id-connect-configuration", "./open-id-connect-logger"], function (require, exports, oidc_client_1, open_id_connect_configuration_1, open_id_connect_logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function default_1(frameworkConfig, callback) {
        frameworkConfig.globalResources([
            "./open-id-connect-user-block",
            "./open-id-connect-user-debug",
            "./open-id-connect-role-filter",
        ]);
        var openIdConnectConfig = new open_id_connect_configuration_1.default();
        callback(openIdConnectConfig);
        var logger = frameworkConfig.container.get(open_id_connect_logger_1.default);
        logger.debug("Configuring the OpenId Connect Client");
        var userManagerSettings = openIdConnectConfig.userManagerSettings;
        var userManager = new oidc_client_1.UserManager(userManagerSettings);
        frameworkConfig.container
            .registerInstance(oidc_client_1.UserManager, userManager);
        frameworkConfig.container
            .registerInstance(open_id_connect_configuration_1.default, openIdConnectConfig);
        logger.debug("Configured the OpenId Connect Client");
    }
    exports.default = default_1;
});
//# sourceMappingURL=plugin.js.map