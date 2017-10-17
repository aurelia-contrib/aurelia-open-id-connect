import { RouterConfiguration } from "aurelia-router";
import { User, UserManager } from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectRouting from "./open-id-connect-routing";
export default class OpenIdConnect {
    private openIdConnectRouting;
    logger: OpenIdConnectLogger;
    userManager: UserManager;
    constructor(openIdConnectRouting: OpenIdConnectRouting, logger: OpenIdConnectLogger, userManager: UserManager);
    configure(routerConfiguration: RouterConfiguration): void;
    login(): Promise<any>;
    logout(): Promise<any>;
    loginSilent(): Promise<User>;
}
