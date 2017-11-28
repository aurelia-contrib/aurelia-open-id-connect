System.register(["aurelia-framework", "./open-id-connect-roles"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, open_id_connect_roles_1, OpenIdConnectNavigationValueConverter;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (open_id_connect_roles_1_1) {
                open_id_connect_roles_1 = open_id_connect_roles_1_1;
            }
        ],
        execute: function () {
            OpenIdConnectNavigationValueConverter = (function () {
                function OpenIdConnectNavigationValueConverter() {
                }
                OpenIdConnectNavigationValueConverter.prototype.toView = function (navigation, user) {
                    return navigation.filter(function (element) {
                        if (!element.settings.roles) {
                            return true;
                        }
                        var roles = element.settings.roles;
                        if (roles.indexOf(open_id_connect_roles_1.default.Authenticated) >= 0) {
                            return user !== null;
                        }
                    });
                };
                OpenIdConnectNavigationValueConverter = __decorate([
                    aurelia_framework_1.autoinject
                ], OpenIdConnectNavigationValueConverter);
                return OpenIdConnectNavigationValueConverter;
            }());
            exports_1("OpenIdConnectNavigationValueConverter", OpenIdConnectNavigationValueConverter);
        }
    };
});
//# sourceMappingURL=open-id-connect-navigation-value-converter.js.map