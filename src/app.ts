import { autoinject } from "aurelia-framework";
import { Redirect, NavigationInstruction, RouterConfiguration, Router } from "aurelia-router";
import { OpenId } from "./open-id/open-id";

@autoinject
export class App {

    private router: Router;

    constructor(private openId: OpenId) {
        this.openId = openId;
    }

    public configureRouter(routerConfiguration: RouterConfiguration, router: Router) {

        // switch from hash (#) to slash (/) navigation
        routerConfiguration.options.pushState = true;

        routerConfiguration.title = "Demo";

        routerConfiguration.addPipelineStep('authorize', AuthorizeStep);

        // configure routes
        routerConfiguration.map([
            // OpenId
            {
                route: 'login', name: 'login', nav: false, navigationStrategy: () => this.openId.Login(),
                settings: { roles: ['anonymous'] }
            },
            {
                route: 'logout', name: 'logout', nav: false, navigationStrategy: () => this.openId.Logout(),
                settings: { roles: ['authorized'] }
            },
            // App
            {
                route: ['', 'home'], name: 'home', nav: true, moduleId: 'home', title: 'home',
                settings: { roles: ['everyone'] }
            },
            {
                route: 'profile', name: 'profile', nav: true, moduleId: 'open-id-profile', title: 'profile',
                settings: { roles: ['authorized'] }
            },
        ]);

        this.openId.Configure(routerConfiguration);
        this.router = router;
    }
}

@autoinject
class AuthorizeStep {

    constructor(private openId: OpenId) {
        this.openId = openId;
    }

    run(navigationInstruction: NavigationInstruction, next: any): Promise<any> {

        // check authorized
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.roles.indexOf('authorized') !== -1)) {
            return this.openId.UserManager.getUser().then((user) => {
                let isAuthorized: boolean = user !== null;
                if (!isAuthorized) {
                    return next.cancel(new Redirect("login"));
                }
            });
        }
        return next();
    }
}