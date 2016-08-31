var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id/open-id"], function (require, exports, aurelia_framework_1, open_id_1) {
    "use strict";
    var App = (function () {
        function App(openId) {
            this.openId = openId;
        }
        App.prototype.configureRouter = function (routerConfiguration, router) {
            routerConfiguration.options.pushState = true;
            routerConfiguration.map([
                { moduleId: "login", route: ["", "login"] },
            ]);
            this.openId.Configure(routerConfiguration);
        };
        App = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [open_id_1.OpenId])
        ], App);
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=app.js.map