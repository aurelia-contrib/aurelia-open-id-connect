import { autoinject } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";
import { User, Log } from "oidc-client";
import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";

@autoinject
export class App {

    private router: Router;
    private user: User;

    constructor(private openIdConnect: OpenIdConnect) {
        this.openIdConnect.logger.enableOidcClientLogging(Log.INFO);

        this.openIdConnect.userManager.getUser().then((user) => {
            this.user = user;
        });
    }

    public configureRouter(routerConfiguration: RouterConfiguration, router: Router) {

        // switch from hash (#) to slash (/) navigation
        routerConfiguration.options.pushState = true;

        routerConfiguration.title = "OpenID Connect Implicit Flow Demo";

        // configure routes
        routerConfiguration.map([
            {
                moduleId: "home", name: "home", nav: true, route: [""],
                settings: { roles: [OpenIdConnectRoles.Everyone] }, title: "home",
            },
            // OpenId
            {
                name: "login", nav: false, navigationStrategy: () => this.openIdConnect.login(), route: "login",
                settings: { roles: [OpenIdConnectRoles.Anonymous] },
            },
            {
                name: "logout", nav: false, navigationStrategy: () => this.openIdConnect.logout(), route: "logout",
                settings: { roles: [OpenIdConnectRoles.Authorized] },
            },
            // todo: determine why profile is not showing up in the demo
            {
                moduleId: "user-profile", name: "profile", nav: true, route: "profile",
                settings: { roles: [OpenIdConnectRoles.Authorized] }, title: "profile",
            },
            // todo: Add an admin module and admin role for the demo
            // todo: because this route is currently a non-functional stub.
            {
                moduleId: "admin", name: "admin", nav: true, route: "admin",
                settings: { roles: [OpenIdConnectRoles.Administrator] }, title: "admin",
            },
        ]);

        this.openIdConnect.configure(routerConfiguration);
        this.router = router;
    }
}
