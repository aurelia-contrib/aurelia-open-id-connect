define(["require", "exports", "./index"], function (require, exports, index_1) {
    "use strict";
    class OpenIdConnectLogger {
        enableOidcClientLogging(level) {
            let validLevels = [
                index_1.Log.INFO,
                index_1.Log.WARN,
                index_1.Log.ERROR,
                index_1.Log.NONE,
            ];
            if (validLevels.indexOf(level) >= 0) {
                index_1.Log.level = level;
                index_1.Log.logger = console;
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
    exports.OpenIdConnectLogger = OpenIdConnectLogger;
});
//# sourceMappingURL=open-id-connect-logger.js.map