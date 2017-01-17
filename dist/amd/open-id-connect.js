var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-routing", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_routing_1, open_id_connect_logger_1) {
    "use strict";
    var OpenIdConnect = (function () {
        function OpenIdConnect(openIdConnectRouting, logger, userManager) {
            this.openIdConnectRouting = openIdConnectRouting;
            this.logger = logger;
            this.userManager = userManager;
        }
        OpenIdConnect.prototype.configure = function (routerConfiguration) {
            if (typeof routerConfiguration === "undefined" || routerConfiguration === null) {
                throw new Error("routerConfiguration parameter must not be undefined or null");
            }
            this.openIdConnectRouting.configureRouter(routerConfiguration);
        };
        OpenIdConnect.prototype.loginSilent = function () {
            var _this = this;
            this.logger.debug("LoginSilent");
            return this.userManager.clearStaleState().then(function () {
                var args = {};
                return _this.userManager.signinSilent(args);
            });
        };
        return OpenIdConnect;
    }());
    OpenIdConnect = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [open_id_connect_routing_1.default,
            open_id_connect_logger_1.default,
            oidc_client_1.UserManager])
    ], OpenIdConnect);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnect;
});
//# sourceMappingURL=open-id-connect.js.map