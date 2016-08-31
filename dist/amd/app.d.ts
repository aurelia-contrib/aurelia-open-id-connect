import { RouterConfiguration, Router } from "aurelia-router";
import { OpenId } from "./open-id/open-id";
export declare class App {
    openId: OpenId;
    constructor(openId: OpenId);
    configureRouter(routerConfiguration: RouterConfiguration, router: Router): void;
}
