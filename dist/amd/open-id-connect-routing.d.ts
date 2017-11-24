import { RouterConfiguration } from "aurelia-router";
import { OpenIdConnectConfiguration } from ".";
import { OpenIdConnectLogger, OpenIdConnectNavigationStrategies } from "./index-internal";
export default class OpenIdConnectRouting {
    private openIdConnectConfiguration;
    private openIdConnectNavigationStrategies;
    private $window;
    private logger;
    constructor(openIdConnectConfiguration: OpenIdConnectConfiguration, openIdConnectNavigationStrategies: OpenIdConnectNavigationStrategies, $window: Window, logger: OpenIdConnectLogger);
    configureRouter(routerConfiguration: RouterConfiguration): void;
    private addLoginRedirectRoute(routerConfiguration);
    private addLogoutRedirectRoute(routerConfiguration);
    private isSilentLogin();
    private getPath(uri);
    private convertUriToAnchor(uri);
}
