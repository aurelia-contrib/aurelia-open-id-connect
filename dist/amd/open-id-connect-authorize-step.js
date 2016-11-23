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
define(["require", "exports", "aurelia-framework", "aurelia-router", "oidc-client", "./open-id-connect-roles"], function (require, exports, aurelia_framework_1, aurelia_router_1, oidc_client_1, open_id_connect_roles_1) {
    "use strict";

    var OpenIdConnectAuthorizeStep = function () {
        function OpenIdConnectAuthorizeStep(userManager) {
            _classCallCheck(this, OpenIdConnectAuthorizeStep);

            this.userManager = userManager;
        }

        _createClass(OpenIdConnectAuthorizeStep, [{
            key: "run",
            value: function run(navigationInstruction, next) {
                var _this = this;

                return this.userManager.getUser().then(function (user) {
                    if (_this.requiresRole(navigationInstruction, open_id_connect_roles_1.default.Authorized)) {
                        if (user === null) {
                            return next.cancel(new aurelia_router_1.Redirect("login"));
                        }
                    }
                    if (_this.requiresRole(navigationInstruction, open_id_connect_roles_1.default.Administrator)) {}
                    return next();
                });
            }
        }, {
            key: "requiresRole",
            value: function requiresRole(navigationInstruction, role) {
                return navigationInstruction.getAllInstructions().some(function (instruction) {
                    return instruction.config.settings.roles !== undefined && instruction.config.settings.roles.indexOf(role) >= 0;
                });
            }
        }]);

        return OpenIdConnectAuthorizeStep;
    }();
    OpenIdConnectAuthorizeStep = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [oidc_client_1.UserManager])], OpenIdConnectAuthorizeStep);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectAuthorizeStep;
});
//# sourceMappingURL=open-id-connect-authorize-step.js.map