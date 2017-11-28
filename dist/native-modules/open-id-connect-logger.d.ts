export declare class OpenIdConnectLogger {
    private _level;
    readonly level: number;
    constructor(level: number);
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    /**
     * Set the log level for both the aurelia-open-id-connect logger
     * and the underlying oidc-client logger.
     */
    private setLogLevel(level);
}
