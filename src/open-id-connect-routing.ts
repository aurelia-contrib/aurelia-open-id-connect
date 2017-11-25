import { autoinject } from "aurelia-framework";
import {
    NavigationInstruction,
    RouterConfiguration,
} from "aurelia-router";
import {
    OpenIdConnectAuthorizeStep,
    OpenIdConnectConfiguration,
    OpenIdConnectLogger,
    OpenIdConnectNavigationStrategies,
} from "./index-internal";

@autoinject
export default class OpenIdConnectRouting {

    constructor(
        private openIdConnectConfiguration: OpenIdConnectConfiguration,
        private openIdConnectNavigationStrategies: OpenIdConnectNavigationStrategies,
        private $window: Window,
        // @ts-ignore
        private logger: OpenIdConnectLogger) { }

    public configureRouter(routerConfiguration: RouterConfiguration) {
        this.addLoginRedirectRoute(routerConfiguration);
        this.addLogoutRedirectRoute(routerConfiguration);
        routerConfiguration.addPipelineStep("authorize", OpenIdConnectAuthorizeStep);
    }

    private addLoginRedirectRoute(routerConfiguration: RouterConfiguration) {
        routerConfiguration.mapRoute({
            name: "logInRedirectCallback",
            navigationStrategy: (instruction: NavigationInstruction) => {
                if (this.isSilentLogin()) {
                    return this.openIdConnectNavigationStrategies.silentSignInCallback(instruction);
                } else {
                    return this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction);
                }
            },
            route: this.getPath(this.openIdConnectConfiguration.redirectUri),
        });
    }

    private addLogoutRedirectRoute(routerConfiguration: RouterConfiguration) {
        routerConfiguration.mapRoute({
            name: "logOutRedirectCallback",
            navigationStrategy: (instruction: NavigationInstruction) => {
                return this.openIdConnectNavigationStrategies.signOutRedirectCallback(instruction);
            },
            route: this.getPath(this.openIdConnectConfiguration.postLogoutRedirectUri),
        });
    }

    private isSilentLogin(): boolean {
        try {
            return this.$window.self !== this.$window.top;
        } catch (e) {
            return true;
        }
    }

    private getPath(uri: string): string {
        return this.convertUriToAnchor(uri).pathname;
    }

    private convertUriToAnchor(uri: string): HTMLAnchorElement {
        const anchor: HTMLAnchorElement = document.createElement("a");
        anchor.href = uri;
        return anchor;
    }
}
