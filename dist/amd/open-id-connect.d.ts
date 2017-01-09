import { RouterConfiguration, NavigationInstruction } from "aurelia-router";
import { UserManager, User } from "oidc-client";
import OpenIdConnectRouting from "./open-id-connect-routing";
import OpenIdConnectLogger from "./open-id-connect-logger";
export default class OpenIdConnect {
    private routerConfigurationService;
    logger: OpenIdConnectLogger;
    userManager: UserManager;
    constructor(routerConfigurationService: OpenIdConnectRouting, logger: OpenIdConnectLogger, userManager: UserManager);
    configure(routerConfiguration: RouterConfiguration): void;
    login(instruction: NavigationInstruction): Promise<any>;
    logout(instruction: NavigationInstruction): Promise<any>;
    loginSilent(): Promise<User>;
    loginRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
    loginSilentRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
    postLogoutRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
    private setRequiredNavigationInstructions(instruction);
}
