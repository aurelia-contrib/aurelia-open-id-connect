import { RouterConfiguration, NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectLogger from "./open-id-connect-logger";
import IRedirectHandler from "./iredirect-handler";
export default class OpenIdConnectRouting {
    private openIdConnectConfiguration;
    private logger;
    private userManager;
    constructor(openIdConnectConfiguration: OpenIdConnectConfiguration, logger: OpenIdConnectLogger, userManager: UserManager);
    configureRouter(routerConfiguration: RouterConfiguration, loginRedirectHandler: IRedirectHandler, loginSilentRedirectHandler: IRedirectHandler, logoutRedirectHandler: IRedirectHandler): void;
    login(instruction: NavigationInstruction): Promise<any>;
    private isSilentLogin();
    private addLoginRoute(routerConfiguration);
    private addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
    private addLoginRedirectRoute(routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler);
    private getPath(uri);
    private getHash(uri);
    private convertUriToAnchor(uri);
    private setRequiredNavigationInstructions(instruction);
}
