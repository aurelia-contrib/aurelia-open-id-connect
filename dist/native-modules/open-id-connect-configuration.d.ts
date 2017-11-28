import { UserManagerSettings } from 'oidc-client';
export default class OpenIdConnectConfiguration {
    [key: string]: any;
    loginRedirectModuleId: string;
    logoutRedirectModuleId: string;
    unauthorizedRedirectModuleId: string;
    logLevel: number;
    userManagerSettings: UserManagerSettings;
}
