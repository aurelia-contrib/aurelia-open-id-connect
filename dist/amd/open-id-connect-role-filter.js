"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id-connect-roles"], function (require, exports, aurelia_framework_1, open_id_connect_roles_1) {
    "use strict";

    var OpenIdConnectRoleFilterValueConverter = function () {
        function OpenIdConnectRoleFilterValueConverter() {
            _classCallCheck(this, OpenIdConnectRoleFilterValueConverter);
        }

        _createClass(OpenIdConnectRoleFilterValueConverter, [{
            key: "toView",
            value: function toView(navigation, user) {
                return navigation.filter(function (element) {
                    var roles = element.settings.roles;
                    if (roles.indexOf(open_id_connect_roles_1.OpenIdConnectRoles.Everyone) >= 0) {
                        console.log("Everyone");
                        return true;
                    }
                    if (roles.indexOf(open_id_connect_roles_1.OpenIdConnectRoles.Authorized) >= 0) {
                        console.log("Authorized");
                        return user !== null;
                    }
                    if (roles.indexOf(open_id_connect_roles_1.OpenIdConnectRoles.Administrator) >= 0) {
                        console.log("Administrator");
                    }
                });
            }
        }]);

        return OpenIdConnectRoleFilterValueConverter;
    }();
    OpenIdConnectRoleFilterValueConverter = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [])], OpenIdConnectRoleFilterValueConverter);
    exports.OpenIdConnectRoleFilterValueConverter = OpenIdConnectRoleFilterValueConverter;
});
//# sourceMappingURL=open-id-connect-role-filter.js.map