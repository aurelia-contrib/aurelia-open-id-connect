define(["require", "exports"], function (require, exports) {
    "use strict";
    class OpenIdLogger {
        Debug(message) {
            console.debug(`DEBUG [openId] ${message}`);
        }
    }
    exports.OpenIdLogger = OpenIdLogger;
});
//# sourceMappingURL=open-id-logger.js.map