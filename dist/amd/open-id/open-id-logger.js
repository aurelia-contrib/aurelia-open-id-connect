define(["require", "exports"], function (require, exports) {
    "use strict";
    var OpenIdLogger = (function () {
        function OpenIdLogger() {
        }
        OpenIdLogger.prototype.Debug = function (message) {
            console.debug("DEBUG [openId] " + message);
        };
        return OpenIdLogger;
    }());
    exports.OpenIdLogger = OpenIdLogger;
});
//# sourceMappingURL=open-id-logger.js.map