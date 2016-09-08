import { autoinject, FrameworkConfiguration } from "aurelia-framework";
import { RouterConfiguration } from "aurelia-router";
import { User, UserManager, UserManagerSettings } from "oidc-client";
import { OpenIdRoles } from './open-id-roles';
import { OpenIdRouting } from "./open-id-routing";
import { OpenIdConfiguration } from "./open-id-configuration";
import { OpenIdAuthorizeStep } from "./open-id-authorize-step";
import { OpenIdLogger } from "./open-id-logger";
import { OpenId } from './open-id';

function configure(config: FrameworkConfiguration, callback: Function) {

    let logger: OpenIdLogger = config.container.get(OpenIdLogger);
    
    config.globalResources('./open-id-user-block');
    config.globalResources('./open-id-role-filter');

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
    OpenIdRouting,
    OpenIdAuthorizeStep,
    OpenIdRoles,
    User,
    UserManager,
    UserManagerSettings
}
