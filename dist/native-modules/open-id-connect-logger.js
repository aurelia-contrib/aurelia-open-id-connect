import { Log } from 'oidc-client';
var OpenIdConnectLogger = /** @class */ (function () {
    function OpenIdConnectLogger(level) {
        // tslint:disable-next-line:variable-name
        this._level = Log.NONE;
        if (level !== null && level !== undefined) {
            this.setLogLevel(level);
        }
    }
    Object.defineProperty(OpenIdConnectLogger.prototype, "level", {
        get: function () {
            return this._level;
        },
        enumerable: true,
        configurable: true
    });
    // +++++++++++++++++++++++++++++++++++++++++++++
    // TODO: Use currying or function overloading to encapsulate shared logic.
    OpenIdConnectLogger.prototype.debug = function (msg) {
        if (this.level >= Log.DEBUG) {
            /* tslint:disable no-console */
            console.debug("DEBUG [OpenIdConnect] " + msg);
        }
    };
    OpenIdConnectLogger.prototype.info = function (msg) {
        if (this.level >= Log.INFO) {
            /* tslint:disable no-console */
            console.info("INFO [OpenIdConnect] " + msg);
        }
    };
    OpenIdConnectLogger.prototype.warn = function (msg) {
        if (this.level >= Log.WARN) {
            /* tslint:disable no-console */
            console.warn("WARN [OpenIdConnect] " + msg);
        }
    };
    OpenIdConnectLogger.prototype.error = function (msg) {
        if (this.level >= Log.ERROR) {
            /* tslint:disable no-console */
            console.error("ERROR [OpenIdConnect] " + msg);
        }
    };
    // END TODO
    // +++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * Set the log level for both the aurelia-open-id-connect logger
     * and the underlying oidc-client logger.
     */
    OpenIdConnectLogger.prototype.setLogLevel = function (level) {
        // Levels are ordered from most to least verbose.
        // The DEBUG level includes all the log levels.
        var validOidcClientLevels = [
            Log.DEBUG,
            Log.INFO,
            Log.WARN,
            Log.ERROR,
            Log.NONE,
        ];
        if (!validOidcClientLevels.includes(level)) {
            var levels = validOidcClientLevels.join(', ');
            var msg = "The log level must be one of " + levels;
            throw new RangeError(msg);
        }
        this._level = level;
        Log.level = level;
        Log.logger = console;
    };
    return OpenIdConnectLogger;
}());
export { OpenIdConnectLogger };
