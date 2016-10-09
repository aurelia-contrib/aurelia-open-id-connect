"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-configuration", "./open-id-connect-authorize-step", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_configuration_1, open_id_connect_authorize_step_1, open_id_connect_logger_1) {
    "use strict";

    var OpenIdConnectRouting = function () {
        function OpenIdConnectRouting(openIdConnectConfiguration, logger, userManager) {
            _classCallCheck(this, OpenIdConnectRouting);

            this.openIdConnectConfiguration = openIdConnectConfiguration;
            this.logger = logger;
            this.userManager = userManager;
        }

        _createClass(OpenIdConnectRouting, [{
            key: "ConfigureRouter",
            value: function ConfigureRouter(routerConfiguration, loginRedirectHandler, logoutRedirectHandler) {
                this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler);
                this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
                routerConfiguration.addPipelineStep("authorize", open_id_connect_authorize_step_1.OpenIdConnectAuthorizeStep);
            }
        }, {
            key: "addLogoutRedirectRoute",
            value: function addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler) {
                var _this = this;

                var logoutRedirectRoute = {
                    name: "postLogoutRedirectRoute",
                    navigationStrategy: function navigationStrategy(instruction) {
                        var redirect = function redirect() {
                            instruction.config.moduleId = _this.openIdConnectConfiguration.LogoutRedirectModuleId;
                        };
                        return logoutRedirectHandler(_this.userManager, _this.logger).then(function () {
                            return redirect();
                        }).catch(function (err) {
                            redirect();
                            throw err;
                        });
                    },
                    route: this.getPath(this.openIdConnectConfiguration.UserManagerSettings.post_logout_redirect_uri)
                };
                routerConfiguration.mapRoute(logoutRedirectRoute);
            }
        }, {
            key: "addLoginRedirectRoute",
            value: function addLoginRedirectRoute(routerConfiguration, loginRedirectHandler) {
                var _this2 = this;

                var loginRedirectRoute = {
                    name: "redirectRoute",
                    navigationStrategy: function navigationStrategy(instruction) {
                        var redirect = function redirect() {
                            instruction.config.moduleId = _this2.openIdConnectConfiguration.LoginRedirectModuleId;
                        };
                        return loginRedirectHandler(_this2.userManager, _this2.logger).then(function () {
                            return redirect();
                        }).catch(function (err) {
                            redirect();
                            throw err;
                        });
                    },
                    route: this.getPath(this.openIdConnectConfiguration.UserManagerSettings.redirect_uri)
                };
                routerConfiguration.mapRoute(loginRedirectRoute);
            }
        }, {
            key: "getPath",
            value: function getPath(uri) {
                return this.convertUriToAnchor(uri).pathname;
            }
        }, {
            key: "getHash",
            value: function getHash(uri) {
                return this.convertUriToAnchor(uri).hash;
            }
        }, {
            key: "convertUriToAnchor",
            value: function convertUriToAnchor(uri) {
                var anchor = document.createElement("a");
                anchor.href = uri;
                return anchor;
            }
        }]);

        return OpenIdConnectRouting;
    }();
    OpenIdConnectRouting = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [open_id_connect_configuration_1.OpenIdConnectConfiguration, open_id_connect_logger_1.OpenIdConnectLogger, oidc_client_1.UserManager])], OpenIdConnectRouting);
    exports.OpenIdConnectRouting = OpenIdConnectRouting;
});
//# sourceMappingURL=open-id-connect-routing.js.map