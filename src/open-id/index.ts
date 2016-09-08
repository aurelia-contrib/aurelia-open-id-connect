import { autoinject, FrameworkConfiguration } from "aurelia-framework";
import { RouterConfiguration } from "aurelia-router";
import { User, UserManager, UserManagerSettings } from "oidc-client";
import { OpenIdRouterConfigurationService } from "./open-id-router-configuration-service";
import { OpenIdConfiguration } from "./open-id-configuration";
import { OpenIdLogger } from "./open-id-logger";
import { OpenId } from './open-id';

function configure(config: FrameworkConfiguration, callback: Function) {

    let logger: OpenIdLogger = config.container.get(OpenIdLogger);
    
    config.globalResources('./foo');

    callback(function (oidcConfig: OpenIdConfiguration) {
        logger.Debug("Configuring the OpenId Connect Client");

        let userManagerSettings = oidcConfig.UserManagerSettings;
        config.container.registerInstance(UserManager, new UserManager(userManagerSettings));
        config.container.registerInstance(OpenIdConfiguration, oidcConfig);
    });
}

export {
    configure,
    OpenId,
    OpenIdConfiguration,
    OpenIdLogger,
    OpenIdRouterConfigurationService,
    User,
    UserManager,
    UserManagerSettings
}
