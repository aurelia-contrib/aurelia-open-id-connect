export default class OpenIdConnectLogger {
    private _level;
    readonly level: number;
    constructor(level: number);
    debug(msg: string): void;
    info(msg: string): void;
    warn(msg: string): void;
    error(msg: string): void;
    private setLogLevel(level);
}
