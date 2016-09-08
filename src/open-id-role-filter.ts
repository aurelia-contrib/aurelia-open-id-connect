import { NavModel } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { User } from './open-id/index';
import { Roles } from './open-id-roles';

@autoinject
export class OpenIdRoleFilterValueConverter {

    toView(navigation: NavModel[], user: User) {
        return navigation.filter((element) => {
            let roles: Roles[] = element.settings.roles;

            if (roles.indexOf(Roles.Everyone) >= 0) {
                return true;
            }

            if (roles.indexOf(Roles.Authorized) >= 0) {
                return user !== null;
            }

            if(roles.indexOf(Roles.Administrator) >=0) {
                // TODO Check for admin role.
            }
        });
    }
}