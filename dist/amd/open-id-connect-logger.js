define(["require", "exports", "oidc-client"], function (require, exports, oidc_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var OpenIdConnectLogger = (function () {
        function OpenIdConnectLogger(level) {
            this.level = oidc_client_1.Log.NONE;
            this.setLogLevel(level);
        }
        OpenIdConnectLogger.prototype.debug = function (message) {
            if (this.level === oidc_client_1.Log.ERROR) {
                console.debug("DEBUG [OpenIdConnect] " + message);
            }
        };
        OpenIdConnectLogger.prototype.setLogLevel = function (level) {
            var validOidcClientLevels = [
                oidc_client_1.Log.INFO,
                oidc_client_1.Log.WARN,
                oidc_client_1.Log.ERROR,
                oidc_client_1.Log.NONE,
            ];
            if (validOidcClientLevels.indexOf(level) >= 0) {
                this.level = level;
                oidc_client_1.Log.level = level;
                oidc_client_1.Log.logger = console;
            }
            else {
                var levels = validOidcClientLevels.join(", ");
                var msg = "The log level must be one of " + levels;
                this.debug(msg);
            }
        };
        return OpenIdConnectLogger;
    }());
    exports.default = OpenIdConnectLogger;
});
//# sourceMappingURL=open-id-connect-logger.js.map