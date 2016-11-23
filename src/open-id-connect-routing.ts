import { autoinject } from "aurelia-framework";
import { RouterConfiguration, RouteConfig, NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectAuthorizeStep from "./open-id-connect-authorize-step";
import OpenIdConnectLogger from "./open-id-connect-logger";
import IRedirectHandler from "./iredirect-handler";

@autoinject
export default class OpenIdConnectRouting {

    constructor(
        private openIdConnectConfiguration: OpenIdConnectConfiguration,
        private logger: OpenIdConnectLogger,
        private userManager: UserManager) { }

    public configureRouter(
        routerConfiguration: RouterConfiguration,
        loginRedirectHandler: IRedirectHandler,
        loginSilentRedirectHandler: IRedirectHandler,
        logoutRedirectHandler: IRedirectHandler) {

        this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler);
        this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);

        routerConfiguration.addPipelineStep("authorize", OpenIdConnectAuthorizeStep);
    }

    private isSilentLogin(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    private addLogoutRedirectRoute(
        routerConfiguration: RouterConfiguration,
        logoutRedirectHandler: IRedirectHandler) {

        let logoutRedirectRoute: RouteConfig = {
            name: "postLogoutRedirectRoute",
            navigationStrategy: (instruction: NavigationInstruction): Promise<any> => {

                let redirect: Function = () => {
                    instruction.config.moduleId = this.openIdConnectConfiguration.logoutRedirectModuleId;
                };

                return logoutRedirectHandler(this.userManager, this.logger)
                    .then(() => redirect())
                    .catch((err) => {
                        redirect();
                        throw err;
                    });
            },
            route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.post_logout_redirect_uri),
        };

        routerConfiguration.mapRoute(logoutRedirectRoute);
    }

    private addLoginRedirectRoute(
        routerConfiguration: RouterConfiguration,
        loginRedirectHandler: IRedirectHandler,
        loginSilentRedirectHandler: IRedirectHandler) {

        let loginRedirectRoute: RouteConfig = {
            name: "redirectRoute",
            navigationStrategy: (instruction: NavigationInstruction): Promise<any> => {

                let redirect: Function;
                let handler: IRedirectHandler;

                if (this.isSilentLogin()) {
                    redirect = () => instruction.config.moduleId = "THIS_HAPPENS_IN_A_CHILD_I_FRAME";
                    handler = loginSilentRedirectHandler;
                } else {
                    redirect = () =>
                        instruction.config.moduleId = this.openIdConnectConfiguration.loginRedirectModuleId;
                    handler = loginRedirectHandler;
                }

                return handler(this.userManager, this.logger)
                    // we need to redirect
                    // otherwise the router complains
                    .then(() => redirect())
                    .catch((err) => {
                        redirect();
                        throw err;
                    });
            },
            route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.redirect_uri),
        };

        routerConfiguration.mapRoute(loginRedirectRoute);
    }

    private getPath(uri: string): string {
        return this.convertUriToAnchor(uri).pathname;
    };

    // This is here for when we decide also to support hash navigation
    // tslint:disable-next-line no-unused-variable
    private getHash(uri: string): string {
        return this.convertUriToAnchor(uri).hash;
    }

    private convertUriToAnchor(uri: string): HTMLAnchorElement {
        let anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = uri;
        return anchor;
    }
}
