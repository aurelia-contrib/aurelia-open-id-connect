"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
define(["require", "exports", "aurelia-framework", "./open-id-configuration"], function (require, exports, aurelia_framework_1, open_id_configuration_1) {
    "use strict";

    var OpenIdRouterConfigurationService = function () {
        function OpenIdRouterConfigurationService(openIdConfiguration) {
            _classCallCheck(this, OpenIdRouterConfigurationService);

            this.openIdConfiguration = openIdConfiguration;
        }

        _createClass(OpenIdRouterConfigurationService, [{
            key: "ConfigureRouter",
            value: function ConfigureRouter(routerConfiguration, loginRedirectHandler, logoutRedirectHandler) {
                this.loginRedirectHandler = loginRedirectHandler;
                this.logoutRedirectHandler = logoutRedirectHandler;
                this.addLoginRedirectRoute(routerConfiguration, loginRedirectHandler);
                this.addLogoutRedirectRoute(routerConfiguration, logoutRedirectHandler);
            }
        }, {
            key: "addLogoutRedirectRoute",
            value: function addLogoutRedirectRoute(routerConfiguration, handler) {
                var _this = this;

                var logoutRedirectRoute = {
                    name: "openIdPostLogoutRedirectRoute",
                    navigationStrategy: function navigationStrategy(instruction) {
                        var redirect = function redirect() {
                            instruction.config.moduleId = _this.openIdConfiguration.LogoutRedirectModuleId;
                        };
                        return handler().then(redirect).catch(function (err) {
                            redirect();
                            throw err;
                        });
                    },
                    route: this.getPath(this.openIdConfiguration.UserManagerSettings.post_logout_redirect_uri)
                };
                routerConfiguration.mapRoute(logoutRedirectRoute);
            }
        }, {
            key: "addLoginRedirectRoute",
            value: function addLoginRedirectRoute(routerConfiguration, handler) {
                var _this2 = this;

                var loginRedirectRoute = {
                    name: "openIdRedirectRoute",
                    navigationStrategy: function navigationStrategy(instruction) {
                        var redirect = function redirect() {
                            instruction.config.moduleId = _this2.openIdConfiguration.LoginRedirectModuleId;
                        };
                        return handler().then(redirect).catch(function (err) {
                            redirect();
                            throw err;
                        });
                    },
                    route: this.getPath(this.openIdConfiguration.UserManagerSettings.redirect_uri)
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

        return OpenIdRouterConfigurationService;
    }();
    OpenIdRouterConfigurationService = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [open_id_configuration_1.OpenIdConfiguration])], OpenIdRouterConfigurationService);
    exports.OpenIdRouterConfigurationService = OpenIdRouterConfigurationService;
});
//# sourceMappingURL=open-id-router-configuration-service.js.map