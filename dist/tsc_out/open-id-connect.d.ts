import { RouterConfiguration } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdConnectRouting } from "./open-id-connect-routing";
import { OpenIdConnectLogger } from "./open-id-connect-logger";
export declare class OpenIdConnect {
    private routerConfigurationService;
    private logger;
    UserManager: UserManager;
    constructor(routerConfigurationService: OpenIdConnectRouting, logger: OpenIdConnectLogger, UserManager: UserManager);
    Configure(routerConfiguration: RouterConfiguration): void;
    Login(): void;
    Logout(): void;
    LoginRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
    PostLogoutRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}
