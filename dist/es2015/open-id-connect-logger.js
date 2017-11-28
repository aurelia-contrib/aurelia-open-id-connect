import { Log } from 'oidc-client';
export class OpenIdConnectLogger {
    constructor(level) {
        // tslint:disable-next-line:variable-name
        this._level = Log.NONE;
        if (level !== null && level !== undefined) {
            this.setLogLevel(level);
        }
    }
    get level() {
        return this._level;
    }
    // +++++++++++++++++++++++++++++++++++++++++++++
    // TODO: Use currying or function overloading to encapsulate shared logic.
    debug(msg) {
        if (this.level >= Log.DEBUG) {
            /* tslint:disable no-console */
            console.debug(`DEBUG [OpenIdConnect] ${msg}`);
        }
    }
    info(msg) {
        if (this.level >= Log.INFO) {
            /* tslint:disable no-console */
            console.info(`INFO [OpenIdConnect] ${msg}`);
        }
    }
    warn(msg) {
        if (this.level >= Log.WARN) {
            /* tslint:disable no-console */
            console.warn(`WARN [OpenIdConnect] ${msg}`);
        }
    }
    error(msg) {
        if (this.level >= Log.ERROR) {
            /* tslint:disable no-console */
            console.error(`ERROR [OpenIdConnect] ${msg}`);
        }
    }
    // END TODO
    // +++++++++++++++++++++++++++++++++++++++++++++++
    /**
     * Set the log level for both the aurelia-open-id-connect logger
     * and the underlying oidc-client logger.
     */
    setLogLevel(level) {
        // Levels are ordered from most to least verbose.
        // The DEBUG level includes all the log levels.
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
