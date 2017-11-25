import { FrameworkConfiguration, PLATFORM } from "aurelia-framework";
import { UserManager } from "oidc-client";
import { OpenIdConnectConfigurationDto } from ".";
import {
    OpenIdConnectConfiguration,
    OpenIdConnectFactory,
    OpenIdConnectLogger,
} from "./index-internal";

export default function (
    frameworkConfig: FrameworkConfiguration,
    callback?: () => OpenIdConnectConfigurationDto,
    factory?: OpenIdConnectFactory) {

    // register global resources
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./open-id-connect-user-block"),
        PLATFORM.moduleName("./open-id-connect-user-debug"),
    ]);

    // TODO: Allow error level configuration in main.ts
    const openIdConnectLogger = factory.createOpenIdConnectLogger(0);
    openIdConnectLogger.debug("Configuring the OpenId Connect Client");

    // allow userland to change the OIDC configuration
    const dto = callback();
    const openIdConnectConfig = factory.createOpenIdConnectConfiguration(dto);

    // register instances in the DI container
    const userManagerSettings = dto.userManagerSettings;
    const userManager = factory.createUserManager(userManagerSettings);

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
