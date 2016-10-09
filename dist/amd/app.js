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
define(["require", "exports", "aurelia-framework", "./open-id-connect/index"], function (require, exports, aurelia_framework_1, index_1) {
    "use strict";

    var App = function () {
        function App(openIdConnect) {
            var _this = this;

            _classCallCheck(this, App);

            this.openIdConnect = openIdConnect;
            this.openIdConnect.UserManager.getUser().then(function (user) {
                _this.user = user;
            });
        }

        _createClass(App, [{
            key: "configureRouter",
            value: function configureRouter(routerConfiguration, router) {
                var _this2 = this;

                routerConfiguration.options.pushState = true;
                routerConfiguration.title = "Demo";
                routerConfiguration.map([{
                    name: "login", nav: false, navigationStrategy: function navigationStrategy() {
                        return _this2.openIdConnect.Login();
                    }, route: "login",
                    settings: { roles: [index_1.OpenIdConnectRoles.Anonymous] }
                }, {
                    name: "logout", nav: false, navigationStrategy: function navigationStrategy() {
                        return _this2.openIdConnect.Logout();
                    }, route: "logout",
                    settings: { roles: [index_1.OpenIdConnectRoles.Authorized] }
                }, {
                    moduleId: "home", name: "home", nav: true, route: ["", "home"],
                    settings: { roles: [index_1.OpenIdConnectRoles.Everyone] }, title: "home"
                }, {
                    moduleId: "user-profile", name: "profile", nav: true, route: "profile",
                    settings: { roles: [index_1.OpenIdConnectRoles.Authorized] }, title: "profile"
                }, {
                    moduleId: "admin", name: "admin", nav: true, route: "admin",
                    settings: { roles: [index_1.OpenIdConnectRoles.Administrator] }, title: "admin"
                }]);
                this.openIdConnect.Configure(routerConfiguration);
                this.router = router;
            }
        }]);

        return App;
    }();
    App = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [index_1.OpenIdConnect])], App);
    exports.App = App;
});
//# sourceMappingURL=app.js.map