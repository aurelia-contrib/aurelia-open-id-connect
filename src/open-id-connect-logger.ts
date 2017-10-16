import { Log } from "oidc-client";

export default class OpenIdConnectLogger {

    private level: number = Log.NONE;

    /**
     * Set the log level for both the aurelia-open-id-connect logger
     * and the underlying oidc-client logger.
     */
    public enableLogging(level: number) {

        const validLevels: number[] = [
            Log.INFO,
            Log.WARN,
            Log.ERROR,
            Log.NONE,
        ];

        if (validLevels.indexOf(level) >= 0) {
            Log.level = level;
            Log.logger = console;
        } else {
            this.level = level;
            const concat: string = validLevels.join(", ");
            const message: string = `The log level must be one of ${concat}`;
            throw new Error(message);
        }
    }

    public debug(message: string) {
        if (this.level === Log.ERROR) {
            /* tslint:disable no-console */
            console.debug(`DEBUG [OpenIdConnect] ${message}`);
        }
    }
}
