import { Log } from 'oidc-client';
export default class OpenIdConnectLogger {
    constructor(level) {
        this._level = Log.NONE;
        if (level !== null && level !== undefined) {
            this.setLogLevel(level);
        }
    }
    get level() {
        return this._level;
    }
    debug(msg) {
        if (this.level >= Log.DEBUG) {
            console.debug(`DEBUG [OpenIdConnect] ${msg}`);
        }
    }
    info(msg) {
        if (this.level >= Log.INFO) {
            console.info(`INFO [OpenIdConnect] ${msg}`);
        }
    }
    warn(msg) {
        if (this.level >= Log.WARN) {
            console.warn(`WARN [OpenIdConnect] ${msg}`);
        }
    }
    error(msg) {
        if (this.level >= Log.ERROR) {
            console.error(`ERROR [OpenIdConnect] ${msg}`);
        }
    }
    setLogLevel(level) {
        const validOidcClientLevels = [
            Log.DEBUG,
            Log.INFO,
            Log.WARN,
            Log.ERROR,
            Log.NONE,
        ];
        if (!validOidcClientLevels.includes(level)) {
            const levels = validOidcClientLevels.join(', ');
            const msg = `The log level must be one of ${levels}`;
            throw new RangeError(msg);
        }
        this._level = level;
        Log.level = level;
        Log.logger = console;
    }
}
//# sourceMappingURL=open-id-connect-logger.js.map