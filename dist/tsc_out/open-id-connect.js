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
    let OpenIdConnect = class OpenIdConnect {
        constructor(routerConfigurationService, logger, UserManager) {
            this.routerConfigurationService = routerConfigurationService;
            this.logger = logger;
            this.UserManager = UserManager;
            this.LoginRedirectHandler = () => {
                this.logger.Debug("LoginRedirectHandler");
                return this.UserManager.getUser().then((user) => {
                    if (user === null || user === undefined) {
                        this.logger.Debug(`user: ${user}`);
                        this.logger.Debug(`window.location.href: ${window.location.href}`);
                        return this.UserManager.signinRedirectCallback(null);
                    }
                });
            };
            this.PostLogoutRedirectHandler = () => {
                this.logger.Debug("PostLogoutRedirectHandler");
                return this.UserManager.signoutRedirectCallback(null);
            };
        }
        Configure(routerConfiguration) {
            this.routerConfigurationService.ConfigureRouter(routerConfiguration, this.LoginRedirectHandler, this.PostLogoutRedirectHandler);
        }
        Login() {
            this.logger.Debug("Login");
            let stateStore = null;
            this.UserManager.clearStaleState(stateStore).then(() => {
                let args = {};
                this.UserManager.signinRedirect(args);
            });
        }
        Logout() {
            this.logger.Debug("Logout");
            this.UserManager.signoutRedirect({});
        }
    };
    OpenIdConnect = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [open_id_connect_routing_1.OpenIdConnectRouting, open_id_connect_logger_1.OpenIdConnectLogger, oidc_client_1.UserManager])
    ], OpenIdConnect);
    exports.OpenIdConnect = OpenIdConnect;
});
//# sourceMappingURL=open-id-connect.js.map