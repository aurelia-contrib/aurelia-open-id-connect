export default class OpenIdConnectLogger {
    private level;
    constructor(level: number);
    debug(message: string): void;
    private setLogLevel(level);
}
