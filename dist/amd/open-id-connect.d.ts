import { RouterConfiguration } from "aurelia-router";
import { User, UserManager, UserManagerEvents } from "oidc-client";
import { OpenIdConnectLogger, OpenIdConnectRouting, UserManagerEventHandler } from "./index-internal";
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
