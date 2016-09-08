var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id-connect/index"], function (require, exports, aurelia_framework_1, index_1) {
    "use strict";
    let App = class App {
        constructor(openIdConnect) {
            this.openIdConnect = openIdConnect;
            this.openIdConnect.UserManager.getUser().then((user) => {
                this.user = user;
            });
        }
        configureRouter(routerConfiguration, router) {
            routerConfiguration.options.pushState = true;
            routerConfiguration.title = "Demo";
            routerConfiguration.map([
                {
                    name: "login", nav: false, navigationStrategy: () => this.openIdConnect.Login(), route: "login",
                    settings: { roles: [index_1.OpenIdConnectRoles.Anonymous] },
                },
                {
                    name: "logout", nav: false, navigationStrategy: () => this.openIdConnect.Logout(), route: "logout",
                    settings: { roles: [index_1.OpenIdConnectRoles.Authorized] },
                },
                {
                    moduleId: "home", name: "home", nav: true, route: ["", "home"],
                    settings: { roles: [index_1.OpenIdConnectRoles.Everyone] }, title: "home",
                },
                {
                    moduleId: "user-profile", name: "profile", nav: true, route: "profile",
                    settings: { roles: [index_1.OpenIdConnectRoles.Authorized] }, title: "profile",
                },
                {
                    moduleId: "admin", name: "admin", nav: true, route: "admin",
                    settings: { roles: [index_1.OpenIdConnectRoles.Administrator] }, title: "admin",
                },
            ]);
            this.openIdConnect.Configure(routerConfiguration);
            this.router = router;
        }
    };
    App = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [index_1.OpenIdConnect])
    ], App);
    exports.App = App;
});
//# sourceMappingURL=app.js.map