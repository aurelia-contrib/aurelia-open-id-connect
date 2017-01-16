import { autoinject } from "aurelia-framework";
import { RouterConfiguration } from "aurelia-router";
import { UserManager, User } from "oidc-client";
import OpenIdConnectRouting from "./open-id-connect-routing";
import OpenIdConnectLogger from "./open-id-connect-logger";

@autoinject
export default class OpenIdConnect {

    constructor(
        private routerConfigurationService: OpenIdConnectRouting,
        public logger: OpenIdConnectLogger,
        public userManager: UserManager) { }

    public configure(routerConfiguration: RouterConfiguration) {

        if (typeof routerConfiguration === "undefined" || routerConfiguration === null) {
            throw new Error("routerConfiguration parameter must not be undefined or null");
        }

        this.routerConfigurationService.configureRouter(
            routerConfiguration,
            this.loginRedirectHandler,
            this.loginSilentRedirectHandler,
            this.postLogoutRedirectHandler);
    }

    public loginSilent(): Promise<User> {
        this.logger.debug("LoginSilent");

        return this.userManager.clearStaleState().then(() => {
            let args: any = {};
            return this.userManager.signinSilent(args);
        });
    }

    public loginRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.debug("LoginRedirectHandler");
        // to avoid page refresh errors
        // check to see whether we already have a user
        return userManager.getUser().then((user) => {
            if (user === null || user === undefined) {
                // if we do not already have a user,
                // process the repsonse from the authorization server
                return userManager.signinRedirectCallback(null);
            }
        });
    }

    public loginSilentRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.debug("SilentLoginRedirectHandler");

        // notify the parent window of the response from the authorization endpoint
        // i.e. trigger signinSilent().then(...)
        return userManager.signinSilentCallback(null);
    }

    public postLogoutRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.debug("PostLogoutRedirectHandler");
        return userManager.signoutRedirectCallback(null);
    }
}
