import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdConnectLogger } from "./index-internal";
export default class OpenIdConnectAuthorizeStep {
    private userManager;
    private logger;
    constructor(userManager: UserManager, logger: OpenIdConnectLogger);
    run(navigationInstruction: NavigationInstruction, next: any): Promise<any>;
    private requiresRole(navigationInstruction, role);
}
