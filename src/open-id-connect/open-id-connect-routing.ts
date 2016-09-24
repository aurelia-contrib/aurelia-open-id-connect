import { autoinject } from "aurelia-framework";
import { RouterConfiguration, RouteConfig, NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdConnectConfiguration } from "./open-id-connect-configuration";
import { OpenIdConnectAuthorizeStep } from "./open-id-connect-authorize-step";
import { OpenIdConnectLogger } from "./open-id-connect-logger";

export interface IRedirectHandler {
    (userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}

@autoinject
export class OpenIdConnectRouting {

    constructor(
        private openIdConnectConfiguration: OpenIdConnectConfiguration,
        private logger: OpenIdConnectLogger,
        private userManager: UserManager) { }

    public ConfigureRouter(
        routerConfiguration: RouterConfiguration,
        loginRedirectHandler: IRedirectHandler,
        logoutRedirectHandler: IRedirectHandler) {

        this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler);
        this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);

        routerConfiguration.addPipelineStep("authorize", OpenIdConnectAuthorizeStep);
    }

    private addLogoutRedirectRoute(
        routerConfiguration: RouterConfiguration,
        logoutRedirectHandler: IRedirectHandler) {

        let logoutRedirectRoute: RouteConfig = {
            name: "postLogoutRedirectRoute",
            navigationStrategy: (instruction: NavigationInstruction): Promise<any> => {

                let redirect: Function = () => {
                    instruction.config.moduleId = this.openIdConnectConfiguration.LogoutRedirectModuleId;
                };

                return logoutRedirectHandler(this.userManager, this.logger)
                    .then(() => redirect())
                    .catch((err) => {
                        redirect();
                        throw err;
                    });
            },
            route: this.getPath(this.openIdConnectConfiguration.UserManagerSettings.post_logout_redirect_uri),
        };

        routerConfiguration.mapRoute(logoutRedirectRoute);
    }

    private addLoginRedirectRoute(
        routerConfiguration: RouterConfiguration,
        loginRedirectHandler: IRedirectHandler) {

        let loginRedirectRoute: RouteConfig = {
            name: "redirectRoute",
            navigationStrategy: (instruction: NavigationInstruction): Promise<any> => {

                let redirect: Function = () => {
                    instruction.config.moduleId = this.openIdConnectConfiguration.LoginRedirectModuleId;
                };

                return loginRedirectHandler(this.userManager, this.logger)
                    .then(() => redirect())
                    .catch((err) => {
                        redirect();
                        throw err;
                    });
            },
            route: this.getPath(this.openIdConnectConfiguration.UserManagerSettings.redirect_uri),
        };

        routerConfiguration.mapRoute(loginRedirectRoute);
    }

    private getPath(uri: string): string {
        return this.convertUriToAnchor(uri).pathname;
    };

    // This is here for when we decide also to support hash navigation
    private getHash(uri: string): string {
        return this.convertUriToAnchor(uri).hash;
    }

    private convertUriToAnchor(uri: string): HTMLAnchorElement {
        let anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = uri;
        return anchor;
    }
}
