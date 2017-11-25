import { RouterConfiguration } from "aurelia-router";
import { User, UserManager, UserManagerEvents } from "oidc-client";
import { UserManagerEventHandler } from "./internal-types";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectRouting from "./open-id-connect-routing";
export default class OpenIdConnect {
    private openIdConnectRouting;
    logger: OpenIdConnectLogger;
    userManager: UserManager;
    constructor(openIdConnectRouting: OpenIdConnectRouting, logger: OpenIdConnectLogger, userManager: UserManager);
    configure(routerConfiguration: RouterConfiguration): void;
    login(): Promise<void>;
    logout(): Promise<void>;
    loginSilent(): Promise<User>;
    getUser(): Promise<User>;
    addOrRemoveHandler(key: keyof UserManagerEvents, handler: UserManagerEventHandler): void;
}
