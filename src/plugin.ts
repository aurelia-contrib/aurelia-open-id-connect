import { FrameworkConfiguration } from "aurelia-framework";
import { UserManager } from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";

export default function (config: FrameworkConfiguration, callback: Function) {

    let logger: OpenIdConnectLogger = config.container.get(OpenIdConnectLogger);

    config.globalResources([
        "./open-id-connect-user-block",
        "./open-id-connect-role-filter",
    ]);

    callback(function (oidcConfig: OpenIdConnectConfiguration) {
        logger.debug("Configuring the OpenId Connect Client");

        let userManagerSettings = oidcConfig.userManagerSettings;

        config.container.registerInstance(UserManager, new UserManager(userManagerSettings));
        config.container.registerInstance(OpenIdConnectConfiguration, oidcConfig);

        logger.debug("Configured the OpenId Connect Client");
    });
}