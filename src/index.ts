import { FrameworkConfiguration } from "aurelia-framework";
import { UserManager } from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectAuthorizationStep from "./open-id-connect-authorize-step";
import OpenIdConnect from "./open-id-connect";
import OpenIdConnectRouting from "./open-id-connect-routing";
import OpenIdConnectRoles from "./open-id-connect-roles";

function configure(config: FrameworkConfiguration, callback: Function) {

    let logger: OpenIdConnectLogger = config.container.get(OpenIdConnectLogger);

    config.globalResources("./open-id-connect-user-block");
    config.globalResources("./open-id-connect-role-filter");

    callback(function (oidcConfig: OpenIdConnectConfiguration) {
        logger.debug("Configuring the OpenId Connect Client");

        let userManagerSettings = oidcConfig.userManagerSettings;

        config.container.registerInstance(UserManager, new UserManager(userManagerSettings));
        config.container.registerInstance(OpenIdConnectConfiguration, oidcConfig);

        logger.debug("Configured the OpenId Connect Client");
    });
}

export {
    configure,
    OpenIdConnect,
    OpenIdConnectRoles,
    OpenIdConnectRouting,
    OpenIdConnectConfiguration,
    OpenIdConnectLogger,
    OpenIdConnectAuthorizationStep,
};
