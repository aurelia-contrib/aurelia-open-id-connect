"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["require", "exports"], function (require, exports) {
    "use strict";

    var OpenIdConnectLogger = function () {
        function OpenIdConnectLogger() {
            _classCallCheck(this, OpenIdConnectLogger);
        }

        _createClass(OpenIdConnectLogger, [{
            key: "debug",
            value: function debug(message) {
                console.debug("DEBUG [OpenIdConnect] " + message);
            }
        }]);

        return OpenIdConnectLogger;
    }();

    exports.OpenIdConnectLogger = OpenIdConnectLogger;
});
//# sourceMappingURL=open-id-connect-logger.js.map