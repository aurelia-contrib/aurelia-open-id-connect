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
    return this._loginRedirectRoute;
  }

  public get logoutRedirectRoute(): string {
    return this._logoutRedirectRoute;
  }

  public get unauthorizedRedirectRoute(): string {
    return this._unauthorizedRedirectRoute;
  }

  public get logLevel(): number {
    return this._logLevel;
  }

  public get userManagerSettings(): UserManagerSettings {
    return this._userManagerSettings;
  }

  public get redirectUri(): string {
    const value = this._userManagerSettings.redirect_uri;
    if (!value) {
      // TODO: Investigate how oidc-client handles undefined/null values.
      throw new Error('The UserManagerSettings.redirect_uri is required.');
    }

    return value;
  }

  public get postLogoutRedirectUri(): string {
    const value = this._userManagerSettings.post_logout_redirect_uri;
    if (!value) {
      // TODO: Investigate how oidc-client handles undefined/null values.
      throw new Error('The UserManagerSettings.post_logout_redirect_uri is required.');
    }

    return value;
  }

  constructor(dto?: OpenIdConnectConfiguration) {

    if (!dto) {
      return;
    }

    Object.keys(dto).forEach((k) => {
      this['_' + k] = dto[k];
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
}
