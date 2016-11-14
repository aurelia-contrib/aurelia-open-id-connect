import { RouterConfiguration } from "aurelia-router";
import { UserManager, User } from "oidc-client";
import { OpenIdConnectRouting } from "./open-id-connect-routing";
import { OpenIdConnectLogger } from "./open-id-connect-logger";
export declare class OpenIdConnect {
    private routerConfigurationService;
    private logger;
    userManager: UserManager;
    constructor(routerConfigurationService: OpenIdConnectRouting, logger: OpenIdConnectLogger, userManager: UserManager);
    Configure(routerConfiguration: RouterConfiguration): void;
    Login(): void;
    LoginSilent(): Promise<User>;
    Logout(): void;
    LoginRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
    LoginSilentRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
    PostLogoutRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}
