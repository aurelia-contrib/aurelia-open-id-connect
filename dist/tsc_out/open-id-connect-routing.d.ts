import { RouterConfiguration } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdConnectConfiguration } from "./open-id-connect-configuration";
import { OpenIdConnectLogger } from "./open-id-connect-logger";
export interface IRedirectHandler {
    (userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}
export declare class OpenIdConnectRouting {
    private openIdConnectConfiguration;
    private logger;
    private userManager;
    private IsSilentLogin;
    constructor(openIdConnectConfiguration: OpenIdConnectConfiguration, logger: OpenIdConnectLogger, userManager: UserManager);
    ConfigureRouter(routerConfiguration: RouterConfiguration, loginRedirectHandler: IRedirectHandler, loginSilentRedirectHandler: IRedirectHandler, logoutRedirectHandler: IRedirectHandler): void;
    StartSilentLogin(): void;
    private FinishSilentLogin();
    private addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
    private addLoginRedirectRoute(routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler);
    private getPath(uri);
    private getHash(uri);
    private convertUriToAnchor(uri);
}
