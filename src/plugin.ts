import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectLogger from "./open-id-connect-logger";

export default function (
    frameworkConfig: FrameworkConfiguration,
    callback?: (openIdConnectConfig: OpenIdConnectConfiguration) => void,
    logLevel?: number) {

    // register global resources
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./open-id-connect-user-block"),
        PLATFORM.moduleName("./open-id-connect-user-debug"),
    ]);

    // TODO: Allow error level configuration in main.ts
    const openIdConnectLogger = new OpenIdConnectLogger(logLevel);
    openIdConnectLogger.debug("Configuring the OpenId Connect Client");

    // allow userland to change the OIDC configuration
    const openIdConnectConfig = new OpenIdConnectConfiguration();
    callback(openIdConnectConfig);

    // register instances in the DI container
    const userManagerSettings = openIdConnectConfig.UserManagerSettings;
    const userManager = new UserManager(userManagerSettings);

    frameworkConfig.container
        .registerInstance(OpenIdConnectLogger, openIdConnectLogger);

    frameworkConfig.container
        .registerInstance(UserManager, userManager);

    frameworkConfig.container
        .registerInstance(OpenIdConnectConfiguration, openIdConnectConfig);

    frameworkConfig.container
        .registerInstance(Window, window);

    openIdConnectLogger.debug("Configured the OpenId Connect Client");
}
