import { UserManagerSettings } from 'oidc-client';

export default class OpenIdConnectConfiguration {
  [key: string]: any;
  public loginRedirectModuleId: string;
  public logoutRedirectModuleId: string;
  public unauthorizedRedirectModuleId: string;
  public logLevel: number;
  public userManagerSettings: UserManagerSettings;
}
