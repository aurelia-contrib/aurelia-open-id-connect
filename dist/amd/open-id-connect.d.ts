import { Router, RouterConfiguration } from "aurelia-router";
import { User, UserManager, UserManagerEvents } from "oidc-client";
import { UserManagerEventHandler } from "./internal-types";
import OpenIdConnectConfigurationManager from "./open-id-connect-configuration-manager";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectRouting from "./open-id-connect-routing";
export default class OpenIdConnect {
    private openIdConnectRouting;
    private router;
    private configuration;
    logger: OpenIdConnectLogger;
    userManager: UserManager;
    constructor(openIdConnectRouting: OpenIdConnectRouting, router: Router, configuration: OpenIdConnectConfigurationManager, logger: OpenIdConnectLogger, userManager: UserManager);
    configure(routerConfiguration: RouterConfiguration): void;
    login(): Promise<void>;
    logout(): Promise<void>;
    loginSilent(): Promise<User>;
    getUser(): Promise<User>;
    addOrRemoveHandler(key: keyof UserManagerEvents, handler: UserManagerEventHandler): void;
    observeUser(callback: (user: User) => void): void;
}
