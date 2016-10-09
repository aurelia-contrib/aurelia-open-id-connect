"use strict";

define(["require", "exports", "oidc-client", "./open-id-connect-roles", "./open-id-connect-routing", "./open-id-connect-configuration", "./open-id-connect-authorize-step", "./open-id-connect-logger", "./open-id-connect"], function (require, exports, oidc_client_1, open_id_connect_roles_1, open_id_connect_routing_1, open_id_connect_configuration_1, open_id_connect_authorize_step_1, open_id_connect_logger_1, open_id_connect_1) {
    "use strict";

    exports.UserManager = oidc_client_1.UserManager;
    exports.OpenIdConnectRoles = open_id_connect_roles_1.OpenIdConnectRoles;
    exports.OpenIdConnectRouting = open_id_connect_routing_1.OpenIdConnectRouting;
    exports.OpenIdConnectConfiguration = open_id_connect_configuration_1.OpenIdConnectConfiguration;
    exports.OpenIdConnectAuthorizeStep = open_id_connect_authorize_step_1.OpenIdConnectAuthorizeStep;
    exports.OpenIdConnectLogger = open_id_connect_logger_1.OpenIdConnectLogger;
    exports.OpenIdConnect = open_id_connect_1.OpenIdConnect;
    function configure(config, callback) {
        var logger = config.container.get(open_id_connect_logger_1.OpenIdConnectLogger);
        config.globalResources("./open-id-connect-user-block");
        config.globalResources("./open-id-connect-role-filter");
        callback(function (oidcConfig) {
            logger.Debug("Configuring the OpenId Connect Client");
            var userManagerSettings = oidcConfig.UserManagerSettings;
            config.container.registerInstance(oidc_client_1.UserManager, new oidc_client_1.UserManager(userManagerSettings));
            config.container.registerInstance(open_id_connect_configuration_1.OpenIdConnectConfiguration, oidcConfig);
        });
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map