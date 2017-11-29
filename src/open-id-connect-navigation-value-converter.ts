import { NavModel } from 'aurelia-router';
import { User } from 'oidc-client';
import { OpenIdConnectRoles } from './open-id-connect-roles';

export class OpenIdConnectNavigationValueConverter {

  public toView(navigation: NavModel[], user: User) {

    return navigation.filter((element) => {
      if (!element.settings.roles) {
        return true;
      }

      const roles: OpenIdConnectRoles[] = element.settings.roles;

      if (roles.indexOf(OpenIdConnectRoles.Authenticated) >= 0) {
        return user !== null;
      }

      return false;
    });
  }
}
