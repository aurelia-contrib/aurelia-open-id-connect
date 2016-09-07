import { autoinject } from "aurelia-framework";
import { RouterConfiguration, Router } from "aurelia-router";
import { OpenId } from "./open-id/open-id";

@autoinject
export class App {

    public openId: OpenId;

    constructor(openId: OpenId) {
        this.openId = openId;
    }

    public configureRouter(routerConfiguration: RouterConfiguration) {

        // switch from hash (#) to slash (/) navigation
        routerConfiguration.options.pushState = true;

        // configure routes
        routerConfiguration.map([
            { moduleId: "home", route: [""] },
            {
                route: 'login', name: 'login', nav: false, navigationStrategy: () => this.openId.Login()
            },
            {
                route: 'logout', name: 'logout', nav: false, navigationStrategy: () => this.openId.Logout()
            },
            {
                route: 'profile', name: 'profile', nav: false, moduleId: 'profile'
            }
        ]);

        this.openId.Configure(routerConfiguration);
    }
}
