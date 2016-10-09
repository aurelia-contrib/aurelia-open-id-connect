import { NavModel } from "aurelia-router";
import { autoinject } from "aurelia-framework";
import { User } from "oidc-client";
import { OpenIdConnectRoles } from "./open-id-connect-roles";

@autoinject
export class OpenIdConnectRoleFilterValueConverter {

    public toView(navigation: NavModel[], user: User) {

        return navigation.filter((element) => {
            let roles: OpenIdConnectRoles[] = element.settings.roles;

            if (roles.indexOf(OpenIdConnectRoles.Everyone) >= 0) {
                console.log("Everyone");
                return true;
            }

            if (roles.indexOf(OpenIdConnectRoles.Authorized) >= 0) {
                console.log("Authorized");
                return user !== null;
            }

            if (roles.indexOf(OpenIdConnectRoles.Administrator) >= 0) {
                console.log("Administrator");
                // TODO Check for admin role.
            }
        });
    }
}