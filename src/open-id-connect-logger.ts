import { Log } from 'oidc-client';

export default class OpenIdConnectLogger {

  // tslint:disable-next-line:variable-name
  private _level: number = Log.NONE;

  public get level() {
    return this._level;
  }

  constructor(level: number) {
    if (level !== null && level !== undefined) {
      this.setLogLevel(level);
    }
  }

  // +++++++++++++++++++++++++++++++++++++++++++++
  // TODO: Use currying or function overloading to encapsulate shared logic.

  public debug(msg: string) {
    if (this.level >= Log.DEBUG) {
      /* tslint:disable no-console */
      console.debug(`DEBUG [OpenIdConnect] ${msg}`);
    }
  }

  public info(msg: string) {
    if (this.level >= Log.INFO) {
      /* tslint:disable no-console */
      console.info(`INFO [OpenIdConnect] ${msg}`);
    }
  }

  public warn(msg: string) {
    if (this.level >= Log.WARN) {
      /* tslint:disable no-console */
      console.warn(`WARN [OpenIdConnect] ${msg}`);
    }
  }

  public error(msg: string) {
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
  private setLogLevel(level: number) {

    // Levels are ordered from most to least verbose.
    // The DEBUG level includes all the log levels.
    const validOidcClientLevels: number[] = [
      Log.DEBUG, // 4
      Log.INFO, // 3
      Log.WARN, // 2
      Log.ERROR, // 1
      Log.NONE, // 0
    ];

    if (!validOidcClientLevels.includes(level)) {
      const levels: string = validOidcClientLevels.join(', ');
      const msg: string = `The log level must be one of ${levels}`;
      throw new RangeError(msg);
    }

    this._level = level;
    Log.level = level;
    Log.logger = console;
  }
}
