import { autoinject } from "aurelia-framework";
import { RouterConfiguration, NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectRoles from "./open-id-connect-roles";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectAuthorizeStep from "./open-id-connect-authorize-step";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectNavigationStrategies from "./open-id-connect-navigation-strategies";

@autoinject
export default class OpenIdConnectRouting {

    constructor(
        private openIdConnectConfiguration: OpenIdConnectConfiguration,
        private openIdConnectNavigationStrategies: OpenIdConnectNavigationStrategies,
        private logger: OpenIdConnectLogger,
        private userManager: UserManager) { }

    public configureRouter(routerConfiguration: RouterConfiguration) {
        this.addLoginRoute(routerConfiguration);
        this.addLogoutRoute(routerConfiguration);
        this.addLoginRedirectRoute(routerConfiguration);
        this.addLogoutRedirectRoute(routerConfiguration);
        routerConfiguration.addPipelineStep("authorize", OpenIdConnectAuthorizeStep);
    }

    private addLoginRoute(routerConfiguration: RouterConfiguration) {
        routerConfiguration.mapRoute({
            name: "login",
            nav: false,
            navigationStrategy: (instruction: NavigationInstruction) => {
                instruction.config.redirect = "";
                return this.openIdConnectNavigationStrategies.login(instruction);
            },
            route: "login",
            settings: {
                roles: [
                    OpenIdConnectRoles.Anonymous,
                ],
            },
        });
    }

    private addLogoutRoute(routerConfiguration: RouterConfiguration) {
        routerConfiguration.mapRoute({
            name: "logout",
            nav: false,
            navigationStrategy: (instruction: NavigationInstruction) => {
                instruction.config.redirect = "";
                return this.openIdConnectNavigationStrategies.logout(instruction);
            },
            route: "logout",
            settings: {
                roles: [
                    OpenIdConnectRoles.Authorized,
                ],
            },
        });
    }

    private addLoginRedirectRoute(routerConfiguration: RouterConfiguration) {
        routerConfiguration.mapRoute({
            name: "logInRedirectCallback",
            navigationStrategy: (instruction: NavigationInstruction) => {
                if (this.isSilentLogin()) {
                    return this.openIdConnectNavigationStrategies.silentSignICallback(instruction);
                } else {
                    return this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction);
                }
            },
            route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.redirect_uri),
        });
    }

    private addLogoutRedirectRoute(routerConfiguration: RouterConfiguration) {
        routerConfiguration.mapRoute({
            name: "logOutRedirectCallback",
            navigationStrategy: (instruction: NavigationInstruction) => {
                return this.openIdConnectNavigationStrategies.signoutRedirectCallback(instruction);
            },
            route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.post_logout_redirect_uri),
        });
    }

    private isSilentLogin(): boolean {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    private getPath(uri: string): string {
        return this.convertUriToAnchor(uri).pathname;
    };

    private convertUriToAnchor(uri: string): HTMLAnchorElement {
        let anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = uri;
        return anchor;
    }
}
