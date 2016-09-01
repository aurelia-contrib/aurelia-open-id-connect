import { Aurelia } from "aurelia-framework";
import { RouterConfiguration } from "aurelia-router";
import { User, UserManager, UserManagerSettings } from "oidc-client";
import { OpenIdRouterConfigurationService } from "./open-id-router-configuration-service";
import { OpenIdConfiguration } from "./open-id-configuration";
import { OpenIdLogger } from "./open-id-logger";
declare function configure(aurelia: Aurelia, callback: Function): void;
declare class OpenId {
    private routerConfigurationService;
    private logger;
    UserManager: UserManager;
    constructor(routerConfigurationService: OpenIdRouterConfigurationService, logger: OpenIdLogger, UserManager: UserManager);
    Configure(routerConfiguration: RouterConfiguration): void;
    Login(): void;
    Logout(): void;
    LoginRedirectHandler: () => Promise<any>;
    PostLogoutRedirectHandler: () => Promise<any>;
}
export { configure, OpenId, OpenIdConfiguration, OpenIdLogger, OpenIdRouterConfigurationService, User, UserManager, UserManagerSettings };
