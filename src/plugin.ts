import { FrameworkConfiguration } from "aurelia-framework";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectLogger from "./open-id-connect-logger";

export default function (
    config: FrameworkConfiguration,
    // todo: Simplify this callback, if appropriate.
    callback: (func: (config: OpenIdConnectConfiguration) => void) => void) {

    const logger: OpenIdConnectLogger = config.container.get(OpenIdConnectLogger);

    config.globalResources([
        "./open-id-connect-user-block",
        "./open-id-connect-role-filter",
    ]);

    callback((oidcConfig: OpenIdConnectConfiguration) => {
        logger.debug("Configuring the OpenId Connect Client");

        const userManagerSettings = oidcConfig.userManagerSettings;

        config.container.registerInstance(UserManager, new UserManager(userManagerSettings));
        config.container.registerInstance(OpenIdConnectConfiguration, oidcConfig);

        logger.debug("Configured the OpenId Connect Client");
    });
}
