import { autoinject } from "aurelia-framework";
import { RouterConfiguration } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdConnectRouting } from "./open-id-connect-routing";
import { OpenIdConnectLogger } from "./open-id-connect-logger";

@autoinject
export class OpenIdConnect {

    constructor(
        private routerConfigurationService: OpenIdConnectRouting,
        private logger: OpenIdConnectLogger,
        public UserManager: UserManager) { }

    public Configure(routerConfiguration: RouterConfiguration) {

        // TODO throw if routerConfiguration is null
        // TODO throw is openIdConnectConfiguration is null (maybe - do we have defaults?)
        this.routerConfigurationService.ConfigureRouter(
            routerConfiguration,
            this.LoginRedirectHandler,
            this.PostLogoutRedirectHandler);
    }

    public Login() {
        this.logger.Debug("Login");

        // prevent Error: No matching state found in storage, 
        // possibly from duplicate state entries
        this.UserManager.clearStaleState().then(() => {
            let args: any = {};
            this.UserManager.signinRedirect(args);
        });
    }

    public Logout() {
        this.logger.Debug("Logout");

        // signoutRedirect throws with empty/null data.
        this.UserManager.signoutRedirect({});
    }

    // This is public only to facilitate unit testing.
    public LoginRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.Debug("LoginRedirectHandler");
        return userManager.getUser().then((user) => {
            // avoid page refresh errors
            if (user === null || user === undefined) {
                logger.Debug(`user: ${user}`);
                logger.Debug(`window.location.href: ${window.location.href}`);
                return userManager.signinRedirectCallback(null);
            }
        });
    }

    // This is public only to facilitate unit testing.
    public PostLogoutRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.Debug("PostLogoutRedirectHandler");
        return userManager.signoutRedirectCallback(null);
    }
}
