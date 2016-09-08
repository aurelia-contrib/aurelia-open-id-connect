import { autoinject } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";
import { OpenId, User, OpenIdRoles } from "./open-id/index";

@autoinject
export class App {

    private router: Router;
    private user: User;

    constructor(private openId: OpenId) {
        this.openId.UserManager.getUser().then((user) => {
            this.user = user;
        });
    }

    public configureRouter(routerConfiguration: RouterConfiguration, router: Router) {

        // switch from hash (#) to slash (/) navigation
        routerConfiguration.options.pushState = true;

        routerConfiguration.title = "Demo";

        // configure routes
        routerConfiguration.map([
            // OpenId
            {
                route: 'login', name: 'login', nav: false, navigationStrategy: () => this.openId.Login(),
                settings: { roles: [OpenIdRoles.Anonymous] }
            },
            {
                route: 'logout', name: 'logout', nav: false, navigationStrategy: () => this.openId.Logout(),
                settings: { roles: [OpenIdRoles.Authorized] }
            },
            // App
            {
                route: ['', 'home'], name: 'home', nav: true, moduleId: 'home', title: 'home',
                settings: { roles: [OpenIdRoles.Everyone] }
            },
            {
                route: 'profile', name: 'profile', nav: true, moduleId: 'open-id-profile', title: 'profile',
                settings: { roles: [OpenIdRoles.Authorized] }
            },
            {
                route: 'admin', name: 'admin', nav: true, moduleId: 'admin', title: 'admin',
                settings: { roles: [OpenIdRoles.Administrator] }
            },
        ]);

        this.openId.Configure(routerConfiguration);
        this.router = router;
    }
}
