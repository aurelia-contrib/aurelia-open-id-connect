var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { valueConverter } from 'aurelia-framework';
import OpenIdConnectRoles from './open-id-connect-roles';
let default_1 = class {
    toView(navModels, user) {
        return navModels.filter((navModel) => {
            if (!navModel.settings) {
                return true;
            }
            const requiredRoles = navModel.settings.roles;
            if (!requiredRoles || requiredRoles.length === 0) {
                return true;
            }
            if (requiredRoles.includes(OpenIdConnectRoles.Authenticated)) {
                return user !== null;
            }
            if (requiredRoles.includes(OpenIdConnectRoles.Anonymous)) {
                return user == null;
            }
            return true;
        });
    }
};
default_1 = __decorate([
    valueConverter('openIdConnectNavigationFilter')
], default_1);
export default default_1;
//# sourceMappingURL=open-id-connect-navigation-filter.js.map