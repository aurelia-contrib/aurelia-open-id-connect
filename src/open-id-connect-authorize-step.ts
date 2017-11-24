import { autoinject } from "aurelia-framework";
import {
    NavigationInstruction,
    Redirect,
} from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectRoles from "./open-id-connect-roles";

@autoinject
export default class OpenIdConnectAuthorizeStep {

    constructor(
        private userManager: UserManager,
        private logger: OpenIdConnectLogger) { }

    public async run(
        navigationInstruction: NavigationInstruction,
        next: any): Promise<any> {

        const user = await this.userManager.getUser();

        if (this.requiresRole(navigationInstruction, OpenIdConnectRoles.Authenticated)) {
            if (user === null) {
                // TODO: Allow configuration of the redirect route.
                this.logger.debug("Requires authenticated role.");
                return next.cancel(new Redirect("/"));
            }
        }

        return next();
    }

    private requiresRole(
        navigationInstruction: NavigationInstruction,
        role: OpenIdConnectRoles): boolean {

        return navigationInstruction.getAllInstructions().some((instruction) =>
            instruction.config.settings.roles !== undefined &&
            instruction.config.settings.roles.indexOf(role) >= 0);
    }
}
