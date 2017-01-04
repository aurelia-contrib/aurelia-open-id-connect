var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "oidc-client", "aurelia-open-id-connect"], function (require, exports, aurelia_framework_1, oidc_client_1, aurelia_open_id_connect_1) {
    "use strict";
    var App = (function () {
        function App(openIdConnect) {
            var _this = this;
            this.openIdConnect = openIdConnect;
            this.openIdConnect.logger.enableOidcClientLogging(oidc_client_1.Log.INFO);
            this.openIdConnect.userManager.getUser().then(function (user) {
                _this.user = user;
            });
        }
        App.prototype.configureRouter = function (routerConfiguration, router) {
            var _this = this;
            routerConfiguration.options.pushState = true;
            routerConfiguration.title = "OpenID Connect Implicit Flow Demo";
            routerConfiguration.map([
                {
                    moduleId: "home", name: "home", nav: true, route: [""],
                    settings: { roles: [aurelia_open_id_connect_1.OpenIdConnectRoles.Everyone] }, title: "home",
                },
                {
                    name: "login", nav: false, navigationStrategy: function () { return _this.openIdConnect.login(); }, route: "login",
                    settings: { roles: [aurelia_open_id_connect_1.OpenIdConnectRoles.Anonymous] },
                },
                {
                    name: "logout", nav: false, navigationStrategy: function () { return _this.openIdConnect.logout(); }, route: "logout",
                    settings: { roles: [aurelia_open_id_connect_1.OpenIdConnectRoles.Authorized] },
                },
                {
                    moduleId: "user-profile", name: "profile", nav: true, route: "profile",
                    settings: { roles: [aurelia_open_id_connect_1.OpenIdConnectRoles.Authorized] }, title: "profile",
                },
                {
                    moduleId: "admin", name: "admin", nav: true, route: "admin",
                    settings: { roles: [aurelia_open_id_connect_1.OpenIdConnectRoles.Administrator] }, title: "admin",
                },
            ]);
            this.openIdConnect.configure(routerConfiguration);
            this.router = router;
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_open_id_connect_1.OpenIdConnect])
    ], App);
    exports.App = App;
});
//# sourceMappingURL=app.js.map