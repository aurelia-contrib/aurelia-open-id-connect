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
        var logger = aurelia.container.get(open_id_logger_1.OpenIdLogger);
        callback(function (oidcConfig) {
            logger.Debug("Configuring the OpenId Connect Client");
            var userManagerSettings = oidcConfig.UserManagerSettings;
            aurelia.container.registerInstance(oidc_client_1.UserManager, new oidc_client_1.UserManager(userManagerSettings));
            aurelia.container.registerInstance(open_id_configuration_1.OpenIdConfiguration, oidcConfig);
        });
    }
    exports.configure = configure;
    var OpenId = (function () {
        function OpenId(routerConfigurationService, logger, UserManager) {
            var _this = this;
            this.routerConfigurationService = routerConfigurationService;
            this.logger = logger;
            this.UserManager = UserManager;
            this.LoginRedirectHandler = function () {
                _this.logger.Debug("LoginRedirectHandler");
                return _this.UserManager.getUser().then(function (user) {
                    if (user === null || user === undefined) {
                        _this.logger.Debug("user: " + user);
                        _this.logger.Debug("window.location.href: " + window.location.href);
                        return _this.UserManager.signinRedirectCallback(null);
                    }
                });
            };
            this.PostLogoutRedirectHandler = function () {
                _this.logger.Debug("PostLogoutRedirectHandler");
                return _this.UserManager.signoutRedirectCallback(null);
            };
        }
        OpenId.prototype.Configure = function (routerConfiguration) {
            this.routerConfigurationService.ConfigureRouter(routerConfiguration, this.LoginRedirectHandler, this.PostLogoutRedirectHandler);
        };
        OpenId.prototype.Login = function () {
            this.logger.Debug("Login");
            this.UserManager.signinRedirect({});
        };
        OpenId.prototype.Logout = function () {
            this.logger.Debug("Logout");
            this.UserManager.signoutRedirect({});
        };
        OpenId = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [open_id_router_configuration_service_1.OpenIdRouterConfigurationService, open_id_logger_1.OpenIdLogger, oidc_client_1.UserManager])
        ], OpenId);
        return OpenId;
    }());
    exports.OpenId = OpenId;
});
//# sourceMappingURL=open-id.js.map