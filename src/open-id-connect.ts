import { autoinject } from "aurelia-framework";
import { RouterConfiguration } from "aurelia-router";
import { UserManager, User } from "oidc-client";
import { OpenIdConnectRouting } from "./open-id-connect-routing";
import { OpenIdConnectLogger } from "./open-id-connect-logger";

@autoinject
export class OpenIdConnect {

    constructor(
        private routerConfigurationService: OpenIdConnectRouting,
        private logger: OpenIdConnectLogger,
        public userManager: UserManager) { }

    public Configure(routerConfiguration: RouterConfiguration) {

        // todo: throw if routerConfiguration is null
        // todo: throw is openIdConnectConfiguration is null (maybe - do we have defaults?)
        this.routerConfigurationService.ConfigureRouter(
            routerConfiguration,
            this.LoginRedirectHandler,
            this.LoginSilentRedirectHandler,
            this.PostLogoutRedirectHandler);
    }

    public Login() {
        this.logger.Debug("Login");

        this.userManager.clearStaleState().then(() => {
            let args: any = {};
            this.userManager.signinRedirect(args);
        });
    }

    public LoginSilent(): Promise<User> {
        this.logger.Debug("LoginSilent starting");
        this.routerConfigurationService.StartSilentLogin();

        return this.userManager.clearStaleState().then(() => {
            let args: any = {};
            return this.userManager.signinSilent(args);
        });
    }

    public Logout() {
        this.logger.Debug("Logout");

        let args: any = {};
        this.userManager.signoutRedirect(args);
    }

    // This is public to facilitate unit testing.
    // todo: Handle "no matching state found in storage" error
    public LoginRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.Debug("LoginRedirectHandler");
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

    // This is public to facilitate unit testing.
    public LoginSilentRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.Debug("SilentLoginRedirectHandler");

        // notify the parent window of the response from the authorization endpoint
        // i.e. trigger signinSilent().then(...)
        return userManager.signinSilentCallback(null);
    }

    // This is public to facilitate unit testing.
    public PostLogoutRedirectHandler(userManager: UserManager, logger: OpenIdConnectLogger): Promise<any> {
        logger.Debug("PostLogoutRedirectHandler");
        return userManager.signoutRedirectCallback(null);
    }
}
