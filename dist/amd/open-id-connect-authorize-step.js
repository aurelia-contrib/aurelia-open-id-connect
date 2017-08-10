var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-router", "oidc-client", "./open-id-connect-roles"], function (require, exports, aurelia_framework_1, aurelia_router_1, oidc_client_1, open_id_connect_roles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenIdConnectAuthorizeStep = (function () {
        function OpenIdConnectAuthorizeStep(userManager) {
            this.userManager = userManager;
        }
        OpenIdConnectAuthorizeStep.prototype.run = function (navigationInstruction, next) {
            var _this = this;
            return this.userManager.getUser().then(function (user) {
                if (_this.requiresRole(navigationInstruction, open_id_connect_roles_1.default.Authorized)) {
                    if (user === null) {
                        return next.cancel(new aurelia_router_1.Redirect("login"));
                    }
                }
                if (_this.requiresRole(navigationInstruction, open_id_connect_roles_1.default.Administrator)) {
                }
                return next();
            });
        };
        OpenIdConnectAuthorizeStep.prototype.requiresRole = function (navigationInstruction, role) {
            return navigationInstruction.getAllInstructions().some(function (instruction) {
                return instruction.config.settings.roles !== undefined &&
                    instruction.config.settings.roles.indexOf(role) >= 0;
            });
        };
        OpenIdConnectAuthorizeStep = __decorate([
            aurelia_framework_1.autoinject,
            __metadata("design:paramtypes", [oidc_client_1.UserManager])
        ], OpenIdConnectAuthorizeStep);
        return OpenIdConnectAuthorizeStep;
    }());
    exports.default = OpenIdConnectAuthorizeStep;
});
//# sourceMappingURL=open-id-connect-authorize-step.js.map