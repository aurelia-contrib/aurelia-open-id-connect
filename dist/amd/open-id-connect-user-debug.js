var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-framework", "./open-id-connect-user-block"], function (require, exports, aurelia_framework_1, open_id_connect_user_block_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = (function (_super) {
        __extends(default_1, _super);
        function default_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(default_1.prototype, "stringifiedUser", {
            get: function () {
                return JSON.stringify(this.user, undefined, 2);
            },
            enumerable: true,
            configurable: true
        });
        default_1 = __decorate([
            aurelia_framework_1.autoinject,
            aurelia_framework_1.customElement("open-id-connect-user-debug")
        ], default_1);
        return default_1;
    }(open_id_connect_user_block_1.default));
    exports.default = default_1;
});
//# sourceMappingURL=open-id-connect-user-debug.js.map