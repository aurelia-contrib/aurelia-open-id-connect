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
    let OpenIdRouterConfigurationService = class OpenIdRouterConfigurationService {
        constructor(openIdConfiguration) {
            this.openIdConfiguration = openIdConfiguration;
        }
        ConfigureRouter(routerConfiguration, loginRedirectHandler, logoutRedirectHandler) {
            this.loginRedirectHandler = loginRedirectHandler;
            this.logoutRedirectHandler = logoutRedirectHandler;
            this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler);
            this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
        }
        addLogoutRedirectRoute(routerConfiguration, handler) {
            let logoutRedirectRoute = {
                name: "openIdPostLogoutRedirectRoute",
                navigationStrategy: (instruction) => {
                    let redirect = () => {
                        instruction.config.moduleId = this.openIdConfiguration.LogoutRedirectModuleId;
                    };
                    return handler()
                        .then(redirect)
                        .catch((err) => {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConfiguration.UserManagerSettings.post_logout_redirect_uri),
            };
            routerConfiguration.mapRoute(logoutRedirectRoute);
        }
        addLoginRedirectRoute(routerConfiguration, handler) {
            let loginRedirectRoute = {
                name: "openIdRedirectRoute",
                navigationStrategy: (instruction) => {
                    let redirect = () => {
                        instruction.config.moduleId = this.openIdConfiguration.LoginRedirectModuleId;
                    };
                    return handler()
                        .then(redirect)
                        .catch((err) => {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConfiguration.UserManagerSettings.redirect_uri),
            };
            routerConfiguration.mapRoute(loginRedirectRoute);
        }
        getPath(uri) {
            return this.convertUriToAnchor(uri).pathname;
        }
        ;
        getHash(uri) {
            return this.convertUriToAnchor(uri).hash;
        }
        convertUriToAnchor(uri) {
            let anchor = document.createElement("a");
            anchor.href = uri;
            return anchor;
        }
    };
    OpenIdRouterConfigurationService = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [open_id_configuration_1.OpenIdConfiguration])
    ], OpenIdRouterConfigurationService);
    exports.OpenIdRouterConfigurationService = OpenIdRouterConfigurationService;
});
//# sourceMappingURL=open-id-router-configuration-service.js.map