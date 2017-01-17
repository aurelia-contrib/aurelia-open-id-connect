var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id-connect"], function (require, exports, aurelia_framework_1, open_id_connect_1) {
    "use strict";
    var OpenIdConnectUserBlock = (function () {
        function OpenIdConnectUserBlock(openIdConnect) {
            this.openIdConnect = openIdConnect;
            this.isLoggedIn = false;
            this.user = null;
        }
        OpenIdConnectUserBlock.prototype.attached = function () {
            var _this = this;
            this.openIdConnect.userManager.getUser().then(function (user) {
                _this.user = user;
                _this.isLoggedIn = user !== null;
            });
        };
        return OpenIdConnectUserBlock;
    }());
    OpenIdConnectUserBlock = __decorate([
        aurelia_framework_1.autoinject,
        aurelia_framework_1.customElement("open-id-connect-user-block"),
        __metadata("design:paramtypes", [open_id_connect_1.default])
    ], OpenIdConnectUserBlock);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectUserBlock;
});
//# sourceMappingURL=open-id-connect-user-block.js.map