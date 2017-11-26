import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectConfigurationManager from "./open-id-connect-configuration-manager";
import OpenIdConnectFactory from "./open-id-connect-factory";
import OpenIdConnectLogger from "./open-id-connect-logger";

export default function (
    frameworkConfig: FrameworkConfiguration,
    callback?: () => OpenIdConnectConfiguration,
    factory?: OpenIdConnectFactory) {

    if (!factory) {
        factory = new OpenIdConnectFactory();
    }

    // register global resources
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./open-id-connect-user-block"),
        PLATFORM.moduleName("./open-id-connect-user-debug"),
    ]);

    // register configuration
    const userConfig = (callback !== null && callback !== undefined)
        ? callback()
        : null;

    const configManager = factory.createOpenIdConnectConfiguration(userConfig);
    frameworkConfig.container
        .registerInstance(OpenIdConnectConfigurationManager, configManager);

    // register logger
    const openIdConnectLogger = factory.createOpenIdConnectLogger(configManager.logLevel);
    frameworkConfig.container
        .registerInstance(OpenIdConnectLogger, openIdConnectLogger);

    // register userManager
    const userManager = factory.createUserManager(configManager.userManagerSettings);
    frameworkConfig.container
        .registerInstance(UserManager, userManager);

    // register window
    frameworkConfig.container.registerInstance(Window, window);
}
