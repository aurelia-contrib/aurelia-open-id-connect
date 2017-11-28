System.register(["oidc-client"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var oidc_client_1, OpenIdConnectLogger;
    return {
        setters: [
            function (oidc_client_1_1) {
                oidc_client_1 = oidc_client_1_1;
            }
        ],
        execute: function () {
            OpenIdConnectLogger = (function () {
                function OpenIdConnectLogger(level) {
                    this._level = oidc_client_1.Log.NONE;
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
                OpenIdConnectLogger.prototype.debug = function (msg) {
                    if (this.level >= oidc_client_1.Log.DEBUG) {
                        console.debug("DEBUG [OpenIdConnect] " + msg);
                    }
                };
                OpenIdConnectLogger.prototype.info = function (msg) {
                    if (this.level >= oidc_client_1.Log.INFO) {
                        console.info("INFO [OpenIdConnect] " + msg);
                    }
                };
                OpenIdConnectLogger.prototype.warn = function (msg) {
                    if (this.level >= oidc_client_1.Log.WARN) {
                        console.warn("WARN [OpenIdConnect] " + msg);
                    }
                };
                OpenIdConnectLogger.prototype.error = function (msg) {
                    if (this.level >= oidc_client_1.Log.ERROR) {
                        console.error("ERROR [OpenIdConnect] " + msg);
                    }
                };
                OpenIdConnectLogger.prototype.setLogLevel = function (level) {
                    var validOidcClientLevels = [
                        oidc_client_1.Log.DEBUG,
                        oidc_client_1.Log.INFO,
                        oidc_client_1.Log.WARN,
                        oidc_client_1.Log.ERROR,
                        oidc_client_1.Log.NONE,
                    ];
                    if (!validOidcClientLevels.includes(level)) {
                        var levels = validOidcClientLevels.join(', ');
                        var msg = "The log level must be one of " + levels;
                        throw new RangeError(msg);
                    }
                    this._level = level;
                    oidc_client_1.Log.level = level;
                    oidc_client_1.Log.logger = console;
                };
                return OpenIdConnectLogger;
            }());
            exports_1("default", OpenIdConnectLogger);
        }
    };
});
//# sourceMappingURL=open-id-connect-logger.js.map