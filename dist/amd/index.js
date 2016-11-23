"use strict";

define(["require", "exports", "oidc-client", "./open-id-connect-logger", "./open-id-connect-configuration", "./open-id-connect-authorize-step", "./open-id-connect", "./open-id-connect-routing", "./open-id-connect-roles"], function (require, exports, oidc_client_1, open_id_connect_logger_1, open_id_connect_configuration_1, open_id_connect_authorize_step_1, open_id_connect_1, open_id_connect_routing_1, open_id_connect_roles_1) {
    "use strict";

    exports.OpenIdConnectLogger = open_id_connect_logger_1.default;
    exports.OpenIdConnectConfiguration = open_id_connect_configuration_1.default;
    exports.OpenIdConnectAuthorizationStep = open_id_connect_authorize_step_1.default;
    exports.OpenIdConnect = open_id_connect_1.default;
    exports.OpenIdConnectRouting = open_id_connect_routing_1.default;
    exports.OpenIdConnectRoles = open_id_connect_roles_1.default;
    function configure(config, callback) {
        var logger = config.container.get(open_id_connect_logger_1.default);
        config.globalResources("./open-id-connect-user-block");
        config.globalResources("./open-id-connect-role-filter");
        callback(function (oidcConfig) {
            logger.debug("Configuring the OpenId Connect Client");
            var userManagerSettings = oidcConfig.userManagerSettings;
            config.container.registerInstance(oidc_client_1.UserManager, new oidc_client_1.UserManager(userManagerSettings));
            config.container.registerInstance(open_id_connect_configuration_1.default, oidcConfig);
            logger.debug("Configured the OpenId Connect Client");
        });
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map