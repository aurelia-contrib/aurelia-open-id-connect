import { NavModel } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { User } from "oidc-client";
import { OpenIdRoles } from './open-id-roles';

@autoinject
export class OpenIdRoleFilterValueConverter {

    toView(navigation: NavModel[], user: User) {
        return navigation.filter((element) => {
            let roles: OpenIdRoles[] = element.settings.roles;

            if (roles.indexOf(OpenIdRoles.Everyone) >= 0) {
                return true;
            }

            if (roles.indexOf(OpenIdRoles.Authorized) >= 0) {
                return user !== null;
            }

            if(roles.indexOf(OpenIdRoles.Administrator) >=0) {
                // TODO Check for admin role.
            }
        });
    }
}