import { autoinject } from "aurelia-framework";
import { Redirect, NavigationInstruction, } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdRoles } from './open-id-roles';

@autoinject
export class OpenIdAuthorizeStep {

    constructor(private userManager: UserManager) { }

    run(navigationInstruction: NavigationInstruction, next: any): Promise<any> {

        return this.userManager.getUser().then((user) => {

            if (this.RequiresRole(navigationInstruction, OpenIdRoles.Authorized)) {
                if (user !== null) {
                    return next.cancel(new Redirect("login"));
                }
            }

            if (this.RequiresRole(navigationInstruction, OpenIdRoles.Administrator)) {
                // TODO Check for admin role.
            }

            return next();
        });
    }

    private RequiresRole(navigationInstruction: NavigationInstruction, role: OpenIdRoles): boolean {
        return navigationInstruction.getAllInstructions().some((instruction) => {
            return instruction.config.settings.roles !== undefined &&
                instruction.config.settings.roles.indexOf(role) >= 0
        });
    }
}