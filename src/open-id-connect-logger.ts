import { Log } from "oidc-client";

export default class OpenIdConnectLogger {

    private level: number = Log.NONE;

    constructor(level: number) {
        this.setLogLevel(level);
    }

    // TODO: Support more log levels.
    public debug(message: string) {
        if (this.level === Log.ERROR) {
            /* tslint:disable no-console */
            console.debug(`DEBUG [OpenIdConnect] ${message}`);
        }
    }

    /**
     * Set the log level for both the aurelia-open-id-connect logger
     * and the underlying oidc-client logger.
     */
    private setLogLevel(level: number) {

        const validOidcClientLevels: number[] = [
            Log.INFO,
            Log.WARN,
            Log.ERROR,
            Log.NONE,
        ];

        if (validOidcClientLevels.indexOf(level) >= 0) {
            this.level = level;
            Log.level = level;
            Log.logger = console;
        } else {
            const levels: string = validOidcClientLevels.join(", ");
            const msg: string = `The log level must be one of ${levels}`;
            this.debug(msg);
        }
    }
}
