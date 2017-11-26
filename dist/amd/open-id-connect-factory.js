define(["require", "exports", "oidc-client", "./index-internal"], function (require, exports, oidc_client_1, index_internal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var default_1 = (function () {
        function default_1() {
        }
        default_1.prototype.createOpenIdConnectConfiguration = function (dto) {
            return new index_internal_1.OpenIdConnectConfiguration(dto);
        };
        default_1.prototype.createOpenIdConnectLogger = function (level) {
            return new index_internal_1.OpenIdConnectLogger(level);
        };
        default_1.prototype.createUserManager = function (settings) {
            return new oidc_client_1.UserManager(settings);
        };
        return default_1;
    }());
    exports.default = default_1;
});
//# sourceMappingURL=open-id-connect-factory.js.map