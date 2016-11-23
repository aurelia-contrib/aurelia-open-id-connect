define(["require", "exports", "oidc-client"], function (require, exports, oidc_client_1) {
    "use strict";
    class OpenIdConnectLogger {
        enableOidcClientLogging(level) {
            let validLevels = [
                oidc_client_1.Log.INFO,
                oidc_client_1.Log.WARN,
                oidc_client_1.Log.ERROR,
                oidc_client_1.Log.NONE,
            ];
            if (validLevels.indexOf(level) >= 0) {
                oidc_client_1.Log.level = level;
                oidc_client_1.Log.logger = console;
            }
            else {
                let concat = validLevels.join(", ");
                let message = `The log level must be one of ${concat}`;
                throw new Error(message);
            }
        }
        debug(message) {
            console.debug(`DEBUG [OpenIdConnect] ${message}`);
        }
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectLogger;
});
//# sourceMappingURL=open-id-connect-logger.js.map