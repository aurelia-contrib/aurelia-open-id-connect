import { valueConverter } from 'aurelia-framework';
import { NavModel } from 'aurelia-router';
import { User } from 'oidc-client';
import OpenIdConnectRoles from './open-id-connect-roles';

@valueConverter('openIdConnectNavigationFilter')
export default class {

  public toView(navModels: NavModel[], user: User) {

    return navModels.filter((navModel) => {

      if (!navModel.settings) {
        return true;
      }

      const requiredRoles: OpenIdConnectRoles[] = navModel.settings.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      if (requiredRoles.includes(OpenIdConnectRoles.Authenticated)) {
        return user !== null;
      }
    });
  }
}
