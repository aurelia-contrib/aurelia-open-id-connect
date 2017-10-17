import { FrameworkConfiguration } from "aurelia-framework";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectLogger from "./open-id-connect-logger";

export default function (
    frameworkConfig: FrameworkConfiguration,
    callback: (openIdConnectConfig: OpenIdConnectConfiguration) => void) {

    frameworkConfig.globalResources([
        "./open-id-connect-user-block",
        "./open-id-connect-role-filter",
    ]);

    const openIdConnectConfig = new OpenIdConnectConfiguration();
    callback(openIdConnectConfig);

    const logger: OpenIdConnectLogger = frameworkConfig.container.get(OpenIdConnectLogger);
    logger.debug("Configuring the OpenId Connect Client");

    const userManagerSettings = openIdConnectConfig.userManagerSettings;
    const userManager = new UserManager(userManagerSettings);
    frameworkConfig.container
        .registerInstance(UserManager, userManager);

    frameworkConfig.container
        .registerInstance(OpenIdConnectConfiguration, openIdConnectConfig);

    logger.debug("Configured the OpenId Connect Client");
}
