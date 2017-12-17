import { UserManagerSettings } from 'oidc-client';
import { OpenIdConnectConfiguration } from './index';

const defaultClientUri = 'https://localhost:9000';

export default class {

  [key: string]: any;

  // tslint:disable-next-line:variable-name
  private _loginRedirectRoute: string = '/';
  // tslint:disable-next-line:variable-name
  private _logoutRedirectRoute: string = '/';
  // tslint:disable-next-line:variable-name
  private _unauthorizedRedirectRoute: '/';
  // tslint:disable-next-line:variable-name
  private _logLevel: 0;
  // tslint:disable-next-line:variable-name
  private _userManagerSettings: UserManagerSettings = {
    authority: 'https://localhost:5000',
    client_id: 'Aurelia.OpenIdConnect',
    loadUserInfo: true,
    post_logout_redirect_uri: `${defaultClientUri}/signout-oidc`,
    redirect_uri: `${defaultClientUri}/signin-oidc`,
    response_type: 'id_token token',
    scope: 'openid email roles profile',
    silent_redirect_uri: `${defaultClientUri}/signin-oidc`,
  };

  public get loginRedirectRoute(): string {
    return this.ensureSlash(this._loginRedirectRoute);
  }

  public get logoutRedirectRoute(): string {
    return this.ensureSlash(this._logoutRedirectRoute);
  }

  public get unauthorizedRedirectRoute(): string {
    return this.ensureSlash(this._unauthorizedRedirectRoute);
  }

  public get logLevel(): number {
    return this._logLevel;
  }

  public get userManagerSettings(): UserManagerSettings {
    return this._userManagerSettings;
  }

  // This convenience property adheres to the Law of Demeter.
  public get redirectUri(): string {
    return this._userManagerSettings.redirect_uri as string;
  }

  // This convenience property adheres to the Law of Demeter.
  public get postLogoutRedirectUri(): string {
    return this._userManagerSettings.post_logout_redirect_uri as string;
  }

  constructor(dto?: OpenIdConnectConfiguration) {

    if (!dto) {
      return;
    }

    Object.keys(dto)
      .filter((key) => dto[key] !== undefined && dto[key] !== null)
      .forEach((key) => {
        this['_' + key] = dto[key];
      });

    if (!dto.userManagerSettings) {
      return;
    }

    Object.keys(dto.userManagerSettings).forEach((k) => {
      // Use a type assertion to suppress the implicty any error.
      // Element implicitly has an 'any' type because type 'UserManagerSettings' has no index signature.
      (this.userManagerSettings as any)[k] = (dto.userManagerSettings as any)[k];
    });
  }

  // Ensure that relative paths (routes) start with a forward slash.
  private ensureSlash(s: string) {
    // Alternatively, we could throw an error in the case of a missing slash.
    return s.charAt(0) === '/' ? s : '/' + s;
  }

}
