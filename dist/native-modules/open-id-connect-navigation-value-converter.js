var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject } from 'aurelia-framework';
import { OpenIdConnectRoles } from './open-id-connect-roles';
var OpenIdConnectNavigationValueConverter = /** @class */ (function () {
    function OpenIdConnectNavigationValueConverter() {
    }
    OpenIdConnectNavigationValueConverter.prototype.toView = function (navigation, user) {
        return navigation.filter(function (element) {
            if (!element.settings.roles) {
                return true;
            }
            var roles = element.settings.roles;
            if (roles.indexOf(OpenIdConnectRoles.Authenticated) >= 0) {
                return user !== null;
            }
            return false;
        });
    };
    OpenIdConnectNavigationValueConverter = __decorate([
        autoinject
    ], OpenIdConnectNavigationValueConverter);
    return OpenIdConnectNavigationValueConverter;
}());
export { OpenIdConnectNavigationValueConverter };