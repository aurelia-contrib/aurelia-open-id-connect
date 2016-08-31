import { autoinject } from "aurelia-framework";
import { RouterConfiguration, RouteConfig, NavigationInstruction } from "aurelia-router";
import { OpenIdConfiguration } from "./open-id-configuration";

@autoinject
export class OpenIdRouterConfigurationService {

    private loginRedirectHandler: Function;
    private logoutRedirectHandler: Function;

    constructor(private openIdConfiguration: OpenIdConfiguration) { }

    public ConfigureRouter(
        routerConfiguration: RouterConfiguration,
        loginRedirectHandler: Function,
        logoutRedirectHandler: Function) {

        // TODO Check whether assigning to this. is necessary for lifetime maintenance.
        this.loginRedirectHandler = loginRedirectHandler;
        this.logoutRedirectHandler = logoutRedirectHandler;
        // END TODO

        this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler);
        this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
    }

    private addLogoutRedirectRoute(
        routerConfiguration: RouterConfiguration,
        handler: Function) {

        let logoutRedirectRoute: RouteConfig = {
            name: "openIdPostLogoutRedirectRoute",
            navigationStrategy: (instruction: NavigationInstruction): Promise<any> => {

                let redirect: Function = () => {
                    instruction.config.moduleId = this.openIdConfiguration.LogoutRedirectModuleId;
                };

                return handler()
                    .then(redirect)
                    .catch((err) => {
                        redirect();
                        throw err;
                    });
            },
            route: this.getPath(this.openIdConfiguration.UserManagerSettings.post_logout_redirect_uri),
        };

        routerConfiguration.mapRoute(logoutRedirectRoute);
    }

    private addLoginRedirectRoute(
        routerConfiguration: RouterConfiguration,
        handler: Function) {

        let loginRedirectRoute: RouteConfig = {
            name: "openIdRedirectRoute",
            navigationStrategy: (instruction: NavigationInstruction): Promise<any> => {

                let redirect: Function = () => {
                    instruction.config.moduleId = this.openIdConfiguration.LoginRedirectModuleId;
                };

                return handler()
                    .then(redirect)
                    .catch((err) => {
                        redirect();
                        throw err;
                    });
            },
            route: this.getPath(this.openIdConfiguration.UserManagerSettings.redirect_uri),
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
