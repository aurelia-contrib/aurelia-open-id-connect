"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["require", "exports", "oidc-client"], function (require, exports, oidc_client_1) {
    "use strict";

    var OpenIdConnectLogger = function () {
        function OpenIdConnectLogger() {
            _classCallCheck(this, OpenIdConnectLogger);
        }

        _createClass(OpenIdConnectLogger, [{
            key: "enableOidcClientLogging",
            value: function enableOidcClientLogging(level) {
                var validLevels = [oidc_client_1.Log.INFO, oidc_client_1.Log.WARN, oidc_client_1.Log.ERROR, oidc_client_1.Log.NONE];
                if (validLevels.indexOf(level) >= 0) {
                    oidc_client_1.Log.level = level;
                    oidc_client_1.Log.logger = console;
                } else {
                    var concat = validLevels.join(", ");
                    var message = "The log level must be one of " + concat;
                    throw new Error(message);
                }
            }
        }, {
            key: "debug",
            value: function debug(message) {
                console.debug("DEBUG [OpenIdConnect] " + message);
            }
        }]);

        return OpenIdConnectLogger;
    }();

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = OpenIdConnectLogger;
});
//# sourceMappingURL=open-id-connect-logger.js.map