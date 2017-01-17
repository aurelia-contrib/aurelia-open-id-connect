import { RouterConfiguration } from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectNavigationStrategies from "./open-id-connect-navigation-strategies";
export default class OpenIdConnectRouting {
    private openIdConnectConfiguration;
    private openIdConnectNavigationStrategies;
    private logger;
    private userManager;
    constructor(openIdConnectConfiguration: OpenIdConnectConfiguration, openIdConnectNavigationStrategies: OpenIdConnectNavigationStrategies, logger: OpenIdConnectLogger, userManager: UserManager);
    configureRouter(routerConfiguration: RouterConfiguration): void;
    private addLoginRoute(routerConfiguration);
    private addLogoutRoute(routerConfiguration);
    private addLoginRedirectRoute(routerConfiguration);
    private addLogoutRedirectRoute(routerConfiguration);
    private isSilentLogin();
    private getPath(uri);
    private convertUriToAnchor(uri);
}
