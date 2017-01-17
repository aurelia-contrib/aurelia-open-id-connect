var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-logger", "./open-id-connect-configuration"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_logger_1, open_id_connect_configuration_1) {
    "use strict";
    var OpenIdConnectNavigationStrategies = (function () {
        function OpenIdConnectNavigationStrategies(logger, openIdConnectConfiguration, userManager) {
            this.logger = logger;
            this.openIdConnectConfiguration = openIdConnectConfiguration;
            this.userManager = userManager;
        }
        OpenIdConnectNavigationStrategies.prototype.login = function (instruction) {
            this.setRequiredNavigationInstructions(instruction);
            var args = {};
            return this.userManager.signinRedirect(args);
        };
        OpenIdConnectNavigationStrategies.prototype.logout = function (instruction) {
            var args = {};
            return this.userManager.signoutRedirect(args);
        };
        OpenIdConnectNavigationStrategies.prototype.signInRedirectCallback = function (instruction) {
            var _this = this;
            var callbackHandler = function () {
                return _this.userManager.getUser().then(function (user) {
                    if (user === null || user === undefined) {
                        var args = {};
                        return _this.userManager.signinRedirectCallback(args);
                    }
                });
            };
            var postCallbackRedirect = function () {
                instruction.config.moduleId = _this.openIdConnectConfiguration.loginRedirectModuleId;
            };
            return this.runHandlers(callbackHandler, postCallbackRedirect);
        };
        OpenIdConnectNavigationStrategies.prototype.silentSignICallback = function (instruction) {
            var _this = this;
            var callbackHandler = function () {
                var args = {};
                return _this.userManager.signinSilentCallback(args);
            };
            var postCallbackRedirect = function () {
                instruction.config.moduleId = "THIS_HAPPENS_IN_A_CHILD_I_FRAME";
            };
            return this.runHandlers(callbackHandler, postCallbackRedirect);
        };
        OpenIdConnectNavigationStrategies.prototype.signoutRedirectCallback = function (instruction) {
            var _this = this;
            var callbackHandler = function () {
                var args = {};
                _this.userManager.signoutRedirectCallback(args);
            };
            var postCallbackRedirect = function () {
                instruction.config.moduleId = _this.openIdConnectConfiguration.logoutRedirectModuleId;
            };
            return this.runHandlers(callbackHandler, postCallbackRedirect);
        };
        OpenIdConnectNavigationStrategies.prototype.runHandlers = function (callbackHandler, postCallbackRedirect) {
            return callbackHandler()
                .then(function () { return postCallbackRedirect(); })
                .catch(function (err) {
                postCallbackRedirect();
                throw err;
            });
        };
        OpenIdConnectNavigationStrategies.prototype.setRequiredNavigationInstructions = function (instruction) {
            instruction.config.href = instruction.fragment;
            instruction.config.moduleId = instruction.fragment;
            instruction.config.redirect = instruction.fragment;
        };
        return OpenIdConnectNavigationStrategies;
    }());
    OpenIdConnectNavigationStrategies = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [open_id_connect_logger_1.default,
            open_id_connect_configuration_1.default,
            oidc_client_1.UserManager])
    ], OpenIdConnectNavigationStrategies);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectNavigationStrategies;
});
//# sourceMappingURL=open-id-connect-navigation-strategies.js.map