import { Log } from "oidc-client";

/* tslint:disable no-console */
export default class OpenIdConnectLogger {

    private level: number = Log.NONE;

    /** 
     * Set the log level for both the aurelia-open-id-connect logger
     * and the underlying oidc-client logger.
     */
    public enableLogging(level: number) {

        let validLevels: number[] = [
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
            let concat: string = validLevels.join(", ");
            let message: string = `The log level must be one of ${concat}`;
            throw new Error(message);
        }
    }

    public debug(message: string) {
        if (this.level === Log.ERROR) {
            console.debug(`DEBUG [OpenIdConnect] ${message}`);
        }
    }
}
