var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-router-configuration-service", "./open-id-configuration", "./open-id-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_router_configuration_service_1, open_id_configuration_1, open_id_logger_1) {
    "use strict";
    exports.User = oidc_client_1.User;
    exports.UserManager = oidc_client_1.UserManager;
    exports.UserManagerSettings = oidc_client_1.UserManagerSettings;
    exports.OpenIdRouterConfigurationService = open_id_router_configuration_service_1.OpenIdRouterConfigurationService;
    exports.OpenIdConfiguration = open_id_configuration_1.OpenIdConfiguration;
    exports.OpenIdLogger = open_id_logger_1.OpenIdLogger;
    function configure(aurelia, callback) {
        let logger = aurelia.container.get(open_id_logger_1.OpenIdLogger);
        callback(function (oidcConfig) {
            logger.Debug("Configuring the OpenId Connect Client");
            let userManagerSettings = oidcConfig.UserManagerSettings;
            aurelia.container.registerInstance(oidc_client_1.UserManager, new oidc_client_1.UserManager(userManagerSettings));
            aurelia.container.registerInstance(open_id_configuration_1.OpenIdConfiguration, oidcConfig);
        });
    }
    exports.configure = configure;
    let OpenId = class OpenId {
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
    OpenId = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [open_id_router_configuration_service_1.OpenIdRouterConfigurationService, open_id_logger_1.OpenIdLogger, oidc_client_1.UserManager])
    ], OpenId);
    exports.OpenId = OpenId;
});
//# sourceMappingURL=open-id.js.map