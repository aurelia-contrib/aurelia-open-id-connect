import { RouterConfiguration } from "aurelia-router";
import { OpenIdConfiguration } from "./open-id-configuration";
export declare class OpenIdRouterConfigurationService {
    private openIdConfiguration;
    private loginRedirectHandler;
    private logoutRedirectHandler;
    constructor(openIdConfiguration: OpenIdConfiguration);
    ConfigureRouter(routerConfiguration: RouterConfiguration, loginRedirectHandler: Function, logoutRedirectHandler: Function): void;
    private addLogoutRedirectRoute(routerConfiguration, handler);
    private addLoginRedirectRoute(routerConfiguration, handler);
    private getPath(uri);
    private getHash(uri);
    private convertUriToAnchor(uri);
}
