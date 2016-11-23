var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id-connect-roles"], function (require, exports, aurelia_framework_1, open_id_connect_roles_1) {
    "use strict";
    let OpenIdConnectRoleFilterValueConverter = class OpenIdConnectRoleFilterValueConverter {
        toView(navigation, user) {
            return navigation.filter((element) => {
                let roles = element.settings.roles;
                if (roles.indexOf(open_id_connect_roles_1.default.Everyone) >= 0) {
                    return true;
                }
                if (roles.indexOf(open_id_connect_roles_1.default.Authorized) >= 0) {
                    return user !== null;
                }
                if (roles.indexOf(open_id_connect_roles_1.default.Administrator) >= 0) {
                }
            });
        }
    };
    OpenIdConnectRoleFilterValueConverter = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [])
    ], OpenIdConnectRoleFilterValueConverter);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectRoleFilterValueConverter;
});
//# sourceMappingURL=open-id-connect-role-filter.js.map