import { RouterConfiguration } from "aurelia-router";
import { OpenIdConnectConfiguration } from "./open-id-connect-configuration";
export declare class OpenIdConnectRouting {
    private openIdConnectConfiguration;
    private loginRedirectHandler;
    private logoutRedirectHandler;
    constructor(openIdConnectConfiguration: OpenIdConnectConfiguration);
    ConfigureRouter(routerConfiguration: RouterConfiguration, loginRedirectHandler: Function, logoutRedirectHandler: Function): void;
    private addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
    private addLoginRedirectRoute(routerConfiguration, loginRedirectHandler);
    private getPath(uri);
    private getHash(uri);
    private convertUriToAnchor(uri);
}
