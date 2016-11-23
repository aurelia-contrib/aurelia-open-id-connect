import { NavModel } from "aurelia-router";
import { autoinject, noView } from "aurelia-framework";
import { User } from "oidc-client";
import OpenIdConnectRoles from "./open-id-connect-roles";

// 
// We use `noView` to prevent Aurelia from looking for a related .html file.
// todo: Use `export default` once Aurelia releases a build with the bug fix.
// todo: The bug issue is here: https://github.com/aurelia/templating/issues/498
// 
@autoinject
@noView
export class OpenIdConnectRoleFilterValueConverter {

    public toView(navigation: NavModel[], user: User) {

        return navigation.filter((element) => {
            let roles: OpenIdConnectRoles[] = element.settings.roles;

            if (roles.indexOf(OpenIdConnectRoles.Everyone) >= 0) {
                return true;
            }

            if (roles.indexOf(OpenIdConnectRoles.Authorized) >= 0) {
                return user !== null;
            }

            if (roles.indexOf(OpenIdConnectRoles.Administrator) >= 0) {
                // todo: Check for admin role.
            }
        });
    }
}
