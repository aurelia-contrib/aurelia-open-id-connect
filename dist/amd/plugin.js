"use strict";

define(["require", "exports", "oidc-client", "./open-id-connect-logger", "./open-id-connect-configuration"], function (require, exports, oidc_client_1, open_id_connect_logger_1, open_id_connect_configuration_1) {
    "use strict";

    function default_1(config, callback) {
        var logger = config.container.get(open_id_connect_logger_1.default);
        config.globalResources(["./open-id-connect-user-block", "./open-id-connect-role-filter"]);
        callback(function (oidcConfig) {
            logger.debug("Configuring the OpenId Connect Client");
            var userManagerSettings = oidcConfig.userManagerSettings;
            config.container.registerInstance(oidc_client_1.UserManager, new oidc_client_1.UserManager(userManagerSettings));
            config.container.registerInstance(open_id_connect_configuration_1.default, oidcConfig);
            logger.debug("Configured the OpenId Connect Client");
        });
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = default_1;
});
//# sourceMappingURL=plugin.js.map