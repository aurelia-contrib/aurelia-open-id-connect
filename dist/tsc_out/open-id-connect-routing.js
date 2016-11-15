var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-configuration", "./open-id-connect-authorize-step", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_configuration_1, open_id_connect_authorize_step_1, open_id_connect_logger_1) {
    "use strict";
    let OpenIdConnectRouting = class OpenIdConnectRouting {
        constructor(openIdConnectConfiguration, logger, userManager) {
            this.openIdConnectConfiguration = openIdConnectConfiguration;
            this.logger = logger;
            this.userManager = userManager;
        }
        get IsSilentLogin() {
            let data = sessionStorage.getItem("isSilentLogin");
            return data === "true";
        }
        set IsSilentLogin(val) {
            let data = String(val);
            sessionStorage.setItem("isSilentLogin", data);
        }
        ConfigureRouter(routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler, logoutRedirectHandler) {
            this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler);
            this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
            routerConfiguration.addPipelineStep("authorize", open_id_connect_authorize_step_1.OpenIdConnectAuthorizeStep);
        }
        StartSilentLogin() {
            this.IsSilentLogin = true;
        }
        FinishSilentLogin() {
            this.IsSilentLogin = false;
        }
        addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler) {
            let logoutRedirectRoute = {
                name: "postLogoutRedirectRoute",
                navigationStrategy: (instruction) => {
                    let redirect = () => {
                        instruction.config.moduleId = this.openIdConnectConfiguration.logoutRedirectModuleId;
                    };
                    return logoutRedirectHandler(this.userManager, this.logger)
                        .then(() => redirect())
                        .catch((err) => {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.post_logout_redirect_uri),
            };
            routerConfiguration.mapRoute(logoutRedirectRoute);
        }
        addLoginRedirectRoute(routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler) {
            let loginRedirectRoute = {
                name: "redirectRoute",
                navigationStrategy: (instruction) => {
                    let redirect;
                    let handler;
                    if (this.IsSilentLogin) {
                        redirect = () => instruction.config.moduleId = "Foobar";
                        handler = loginSilentRedirectHandler;
                        this.FinishSilentLogin();
                    }
                    else {
                        redirect = () => instruction.config.moduleId = this.openIdConnectConfiguration.loginRedirectModuleId;
                        handler = loginRedirectHandler;
                    }
                    return handler(this.userManager, this.logger)
                        .then(() => redirect())
                        .catch((err) => {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.redirect_uri),
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
    OpenIdConnectRouting = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [open_id_connect_configuration_1.OpenIdConnectConfiguration, open_id_connect_logger_1.OpenIdConnectLogger, oidc_client_1.UserManager])
    ], OpenIdConnectRouting);
    exports.OpenIdConnectRouting = OpenIdConnectRouting;
});
//# sourceMappingURL=open-id-connect-routing.js.map