import { RouterConfiguration, Router } from "aurelia-router";
import { OpenIdConnect } from "./open-id-connect/index";
export declare class App {
    private openIdConnect;
    private router;
    private user;
    constructor(openIdConnect: OpenIdConnect);
    configureRouter(routerConfiguration: RouterConfiguration, router: Router): void;
}
