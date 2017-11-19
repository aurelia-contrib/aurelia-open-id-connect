import { autoinject } from "aurelia-framework";
import { RouterConfiguration } from "aurelia-router";
import {
    User,
    UserManager,
} from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectRouting from "./open-id-connect-routing";

@autoinject
export default class OpenIdConnect {

    constructor(
        private openIdConnectRouting: OpenIdConnectRouting,
        public logger: OpenIdConnectLogger,
        public userManager: UserManager) { }

    public configure(routerConfiguration: RouterConfiguration) {

        if (typeof routerConfiguration === "undefined" || routerConfiguration === null) {
            throw new Error("routerConfiguration parameter must not be undefined or null");
        }

        this.openIdConnectRouting.configureRouter(routerConfiguration);
    }

    public login(): Promise<any> {
        const args: any = {};
        return this.userManager.signinRedirect(args);
    }

    public logout(): Promise<any> {
        const args: any = {};
        return this.userManager.signoutRedirect(args);
    }

    public async loginSilent(): Promise<User> {
        const args: any = {};
        return this.userManager.signinSilent(args);
    }
}
