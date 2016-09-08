import { autoinject } from "aurelia-framework";
import { Redirect, NavigationInstruction, } from "aurelia-router";
import { OpenId, User, Roles } from "./open-id/index";

@autoinject
export class AuthorizeStep {

    constructor(private openId: OpenId) {
        this.openId = openId;
    }

    run(navigationInstruction: NavigationInstruction, next: any): Promise<any> {

        return this.openId.UserManager.getUser().then((user) => {

            if (this.RequiresRole(navigationInstruction, Roles.Authorized)) {
                if (user !== null) {
                    return next.cancel(new Redirect("login"));
                }
            }

            if (this.RequiresRole(navigationInstruction, Roles.Administrator)) {
                // TODO Check for admin role.
            }

            return next();
        });
    }

    private RequiresRole(navigationInstruction: NavigationInstruction, role: Roles): boolean {
        return navigationInstruction.getAllInstructions().some((instruction) => {
            return instruction.config.settings.roles !== undefined &&
                instruction.config.settings.roles.indexOf(role) >= 0
        });
    }
}