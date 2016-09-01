"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(["require", "exports"], function (require, exports) {
    "use strict";

    var OpenIdLogger = function () {
        function OpenIdLogger() {
            _classCallCheck(this, OpenIdLogger);
        }

        _createClass(OpenIdLogger, [{
            key: "Debug",
            value: function Debug(message) {
                console.debug("DEBUG [openId] " + message);
            }
        }]);

        return OpenIdLogger;
    }();

    exports.OpenIdLogger = OpenIdLogger;
});
//# sourceMappingURL=open-id-logger.js.map