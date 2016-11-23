import { Log } from "oidc-client";

/* tslint:disable no-console */
export default class OpenIdConnectLogger {

    public enableOidcClientLogging(level: number) {

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
            let concat: string = validLevels.join(", ");
            let message: string = `The log level must be one of ${concat}`;
            throw new Error(message);
        }
    }

    public debug(message: string) {
        console.debug(`DEBUG [OpenIdConnect] ${message}`);
    }
}
