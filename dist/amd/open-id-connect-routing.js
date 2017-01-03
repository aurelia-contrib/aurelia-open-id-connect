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
    var OpenIdConnectRouting = (function () {
        function OpenIdConnectRouting(openIdConnectConfiguration, logger, userManager) {
            this.openIdConnectConfiguration = openIdConnectConfiguration;
            this.logger = logger;
            this.userManager = userManager;
        }
        OpenIdConnectRouting.prototype.configureRouter = function (routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler, logoutRedirectHandler) {
            this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler);
            this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
            routerConfiguration.addPipelineStep("authorize", open_id_connect_authorize_step_1.default);
        };
        OpenIdConnectRouting.prototype.isSilentLogin = function () {
            try {
                return window.self !== window.top;
            }
            catch (e) {
                return true;
            }
        };
        OpenIdConnectRouting.prototype.addLogoutRedirectRoute = function (routerConfiguration, logoutRedirectHandler) {
            var _this = this;
            var logoutRedirectRoute = {
                name: "postLogoutRedirectRoute",
                navigationStrategy: function (instruction) {
                    var redirect = function () {
                        instruction.config.moduleId = _this.openIdConnectConfiguration.logoutRedirectModuleId;
                    };
                    return logoutRedirectHandler(_this.userManager, _this.logger)
                        .then(function () { return redirect(); })
                        .catch(function (err) {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.post_logout_redirect_uri),
            };
            routerConfiguration.mapRoute(logoutRedirectRoute);
        };
        OpenIdConnectRouting.prototype.addLoginRedirectRoute = function (routerConfiguration, loginRedirectHandler, loginSilentRedirectHandler) {
            var _this = this;
            var loginRedirectRoute = {
                name: "redirectRoute",
                navigationStrategy: function (instruction) {
                    var redirect;
                    var handler;
                    if (_this.isSilentLogin()) {
                        redirect = function () { return instruction.config.moduleId = "THIS_HAPPENS_IN_A_CHILD_I_FRAME"; };
                        handler = loginSilentRedirectHandler;
                    }
                    else {
                        redirect = function () {
                            return instruction.config.moduleId = _this.openIdConnectConfiguration.loginRedirectModuleId;
                        };
                        handler = loginRedirectHandler;
                    }
                    return handler(_this.userManager, _this.logger)
                        .then(function () { return redirect(); })
                        .catch(function (err) {
                        redirect();
                        throw err;
                    });
                },
                route: this.getPath(this.openIdConnectConfiguration.userManagerSettings.redirect_uri),
            };
            routerConfiguration.mapRoute(loginRedirectRoute);
        };
        OpenIdConnectRouting.prototype.getPath = function (uri) {
            return this.convertUriToAnchor(uri).pathname;
        };
        ;
        OpenIdConnectRouting.prototype.getHash = function (uri) {
            return this.convertUriToAnchor(uri).hash;
        };
        OpenIdConnectRouting.prototype.convertUriToAnchor = function (uri) {
            var anchor = document.createElement("a");
            anchor.href = uri;
            return anchor;
        };
        return OpenIdConnectRouting;
    }());
    OpenIdConnectRouting = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [open_id_connect_configuration_1.default,
            open_id_connect_logger_1.default,
            oidc_client_1.UserManager])
    ], OpenIdConnectRouting);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectRouting;
});
//# sourceMappingURL=open-id-connect-routing.js.map