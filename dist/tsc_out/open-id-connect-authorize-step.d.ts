import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
export default class OpenIdConnectAuthorizeStep {
    private userManager;
    constructor(userManager: UserManager);
    run(navigationInstruction: NavigationInstruction, next: any): Promise<any>;
    private requiresRole(navigationInstruction, role);
}
