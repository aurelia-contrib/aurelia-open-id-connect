System.register(["aurelia-framework", "./open-id-connect-authorize-step", "./open-id-connect-configuration-manager", "./open-id-connect-logger", "./open-id-connect-navigation-strategies"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, open_id_connect_authorize_step_1, open_id_connect_configuration_manager_1, open_id_connect_logger_1, open_id_connect_navigation_strategies_1, OpenIdConnectRouting;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (open_id_connect_authorize_step_1_1) {
                open_id_connect_authorize_step_1 = open_id_connect_authorize_step_1_1;
            },
            function (open_id_connect_configuration_manager_1_1) {
                open_id_connect_configuration_manager_1 = open_id_connect_configuration_manager_1_1;
            },
            function (open_id_connect_logger_1_1) {
                open_id_connect_logger_1 = open_id_connect_logger_1_1;
            },
            function (open_id_connect_navigation_strategies_1_1) {
                open_id_connect_navigation_strategies_1 = open_id_connect_navigation_strategies_1_1;
            }
        ],
        execute: function () {
            OpenIdConnectRouting = (function () {
                function OpenIdConnectRouting(openIdConnectConfiguration, openIdConnectNavigationStrategies, $window, logger) {
                    this.openIdConnectConfiguration = openIdConnectConfiguration;
                    this.openIdConnectNavigationStrategies = openIdConnectNavigationStrategies;
                    this.$window = $window;
                    this.logger = logger;
                }
                OpenIdConnectRouting.prototype.configureRouter = function (routerConfiguration) {
                    this.addLoginRedirectRoute(routerConfiguration);
                    this.addLogoutRedirectRoute(routerConfiguration);
                    routerConfiguration.addPipelineStep('authorize', open_id_connect_authorize_step_1.default);
                };
                OpenIdConnectRouting.prototype.addLoginRedirectRoute = function (routerConfiguration) {
                    var _this = this;
                    routerConfiguration.mapRoute({
                        name: 'logInRedirectCallback',
                        navigationStrategy: function (instruction) {
                            if (_this.isSilentLogin()) {
                                return _this.openIdConnectNavigationStrategies.silentSignInCallback(instruction);
                            }
                            else {
                                return _this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction);
                            }
                        },
                        route: this.getPath(this.openIdConnectConfiguration.redirectUri),
                    });
                };
                OpenIdConnectRouting.prototype.addLogoutRedirectRoute = function (routerConfiguration) {
                    var _this = this;
                    routerConfiguration.mapRoute({
                        name: 'logOutRedirectCallback',
                        navigationStrategy: function (instruction) {
                            return _this.openIdConnectNavigationStrategies.signOutRedirectCallback(instruction);
                        },
                        route: this.getPath(this.openIdConnectConfiguration.postLogoutRedirectUri),
                    });
                };
                OpenIdConnectRouting.prototype.isSilentLogin = function () {
                    try {
                        return this.$window.self !== this.$window.top;
                    }
                    catch (e) {
                        return true;
                    }
                };
                OpenIdConnectRouting.prototype.getPath = function (uri) {
                    return this.convertUriToAnchor(uri).pathname;
                };
                OpenIdConnectRouting.prototype.convertUriToAnchor = function (uri) {
                    var anchor = document.createElement('a');
                    anchor.href = uri;
                    return anchor;
                };
                OpenIdConnectRouting = __decorate([
                    aurelia_framework_1.autoinject,
                    __metadata("design:paramtypes", [open_id_connect_configuration_manager_1.default,
                        open_id_connect_navigation_strategies_1.default,
                        Window,
                        open_id_connect_logger_1.default])
                ], OpenIdConnectRouting);
                return OpenIdConnectRouting;
            }());
            exports_1("default", OpenIdConnectRouting);
        }
    };
});
//# sourceMappingURL=open-id-connect-routing.js.map