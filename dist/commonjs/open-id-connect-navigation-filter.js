"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var open_id_connect_roles_1 = require("./open-id-connect-roles");
var default_1 = (function () {
    function default_1() {
    }
    default_1.prototype.toView = function (navModels, user) {
        return navModels.filter(function (navModel) {
            if (!navModel.settings) {
                return true;
            }
            var requiredRoles = navModel.settings.roles;
            if (!requiredRoles || requiredRoles.length === 0) {
                return true;
            }
            if (requiredRoles.includes(open_id_connect_roles_1.default.Authenticated)) {
                return user !== null;
            }
        });
    };
    default_1 = __decorate([
        aurelia_framework_1.valueConverter('openIdConnectNavigationFilter')
    ], default_1);
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=open-id-connect-navigation-filter.js.map