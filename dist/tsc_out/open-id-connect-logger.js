define(["require", "exports"], function (require, exports) {
    "use strict";
    class OpenIdConnectLogger {
        Debug(message) {
            console.debug(`DEBUG [OpenIdConnect] ${message}`);
        }
    }
    exports.OpenIdConnectLogger = OpenIdConnectLogger;
});
//# sourceMappingURL=open-id-connect-logger.js.map