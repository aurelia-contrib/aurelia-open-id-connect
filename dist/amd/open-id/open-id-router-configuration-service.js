var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id-configuration"], function (require, exports, aurelia_framework_1, open_id_configuration_1) {
    "use strict";
    var OpenIdRouterConfigurationService = (function () {
        function OpenIdRouterConfigurationService(openIdConfiguration) {
            this.openIdConfiguration = openIdConfiguration;
        }
        OpenIdRouterConfigurationService.prototype.ConfigureRouter = function (routerConfiguration, loginRedirectHandler, logoutRedirectHandler) {
            this.loginRedirectHandler = loginRedirectHandler;
            this.logoutRedirectHandler = logoutRedirectHandler;
            this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler);
            this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
        };
        OpenIdRouterConfigurationService.prototype.addLogoutRedirectRoute = function (routerConfiguration, handler) {
            var _this = this;
            var logoutRedirectRoute = {
                name: "openIdPostLogoutRedirectRoute",
                navigationStrategy: function (instruction) {
                    var redirect = function () {
                        instruction.config.moduleId = _this.openIdConfiguration.LogoutRedirectModuleId;
                    };
                    return handler()
                        .then(redirect)
                        .catch(function (err) {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConfiguration.UserManagerSettings.post_logout_redirect_uri),
            };
            routerConfiguration.mapRoute(logoutRedirectRoute);
        };
        OpenIdRouterConfigurationService.prototype.addLoginRedirectRoute = function (routerConfiguration, handler) {
            var _this = this;
            var loginRedirectRoute = {
                name: "openIdRedirectRoute",
                navigationStrategy: function (instruction) {
                    var redirect = function () {
                        instruction.config.moduleId = _this.openIdConfiguration.LoginRedirectModuleId;
                    };
                    return handler()
                        .then(redirect)
                        .catch(function (err) {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConfiguration.UserManagerSettings.redirect_uri),
            };
            routerConfiguration.mapRoute(loginRedirectRoute);
        };
        OpenIdRouterConfigurationService.prototype.getPath = function (uri) {
            return this.convertUriToAnchor(uri).pathname;
        };
        ;
        OpenIdRouterConfigurationService.prototype.getHash = function (uri) {
            return this.convertUriToAnchor(uri).hash;
        };
        OpenIdRouterConfigurationService.prototype.convertUriToAnchor = function (uri) {
            var anchor = document.createElement("a");
            anchor.href = uri;
            return anchor;
        };
        OpenIdRouterConfigurationService = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [open_id_configuration_1.OpenIdConfiguration])
        ], OpenIdRouterConfigurationService);
        return OpenIdRouterConfigurationService;
    }());
    exports.OpenIdRouterConfigurationService = OpenIdRouterConfigurationService;
});
//# sourceMappingURL=open-id-router-configuration-service.js.map