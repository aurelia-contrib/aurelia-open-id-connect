import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectLogger from "./open-id-connect-logger";

export default function (
    frameworkConfig: FrameworkConfiguration,
    callback: (openIdConnectConfig: OpenIdConnectConfiguration) => void) {

    // register global resources
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./open-id-connect-user-block"),
        PLATFORM.moduleName("./open-id-connect-user-debug"),
    ]);

    const logger: OpenIdConnectLogger = frameworkConfig.container.get(OpenIdConnectLogger);
    logger.debug("Configuring the OpenId Connect Client");

    // allow userland to change the OIDC configuration
    const openIdConnectConfig = new OpenIdConnectConfiguration();
    callback(openIdConnectConfig);

    // register instances in the DI container
    const userManagerSettings = openIdConnectConfig.userManagerSettings;
    const userManager = new UserManager(userManagerSettings);

    frameworkConfig.container
        .registerInstance(UserManager, userManager);

    frameworkConfig.container
        .registerInstance(OpenIdConnectConfiguration, openIdConnectConfig);

    frameworkConfig.container
        .registerInstance(Window, window);

    logger.debug("Configured the OpenId Connect Client");
}
