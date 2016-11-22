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
define(["require", "exports", "aurelia-framework", "oidc-client", "./open-id-connect-routing", "./open-id-connect-logger"], function (require, exports, aurelia_framework_1, oidc_client_1, open_id_connect_routing_1, open_id_connect_logger_1) {
    "use strict";

    var OpenIdConnect = function () {
        function OpenIdConnect(routerConfigurationService, logger, userManager) {
            _classCallCheck(this, OpenIdConnect);

            this.routerConfigurationService = routerConfigurationService;
            this.logger = logger;
            this.userManager = userManager;
        }

        _createClass(OpenIdConnect, [{
            key: "configure",
            value: function configure(routerConfiguration) {
                if (typeof routerConfiguration === "undefined" || routerConfiguration === null) {
                    throw new Error("routerConfiguration parameter must not be undefined or null");
                }
                this.routerConfigurationService.configureRouter(routerConfiguration, this.loginRedirectHandler, this.loginSilentRedirectHandler, this.postLogoutRedirectHandler);
            }
        }, {
            key: "login",
            value: function login() {
                var _this = this;

                this.logger.debug("Login");
                this.userManager.clearStaleState().then(function () {
                    var args = {};
                    _this.userManager.signinRedirect(args);
                });
            }
        }, {
            key: "loginSilent",
            value: function loginSilent() {
                var _this2 = this;

                this.logger.debug("LoginSilent");
                return this.userManager.clearStaleState().then(function () {
                    var args = {};
                    return _this2.userManager.signinSilent(args);
                });
            }
        }, {
            key: "logout",
            value: function logout() {
                this.logger.debug("Logout");
                var args = {};
                this.userManager.signoutRedirect(args);
            }
        }, {
            key: "loginRedirectHandler",
            value: function loginRedirectHandler(userManager, logger) {
                logger.debug("LoginRedirectHandler");
                return userManager.getUser().then(function (user) {
                    if (user === null || user === undefined) {
                        return userManager.signinRedirectCallback(null);
                    }
                });
            }
        }, {
            key: "loginSilentRedirectHandler",
            value: function loginSilentRedirectHandler(userManager, logger) {
                logger.debug("SilentLoginRedirectHandler");
                return userManager.signinSilentCallback(null);
            }
        }, {
            key: "postLogoutRedirectHandler",
            value: function postLogoutRedirectHandler(userManager, logger) {
                logger.debug("PostLogoutRedirectHandler");
                return userManager.signoutRedirectCallback(null);
            }
        }]);

        return OpenIdConnect;
    }();
    OpenIdConnect = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [open_id_connect_routing_1.OpenIdConnectRouting, open_id_connect_logger_1.OpenIdConnectLogger, oidc_client_1.UserManager])], OpenIdConnect);
    exports.OpenIdConnect = OpenIdConnect;
});
//# sourceMappingURL=open-id-connect.js.map