import { UserManagerSettings } from 'oidc-client';
export default class OpenIdConnectConfiguration {
    [key: string]: any;
    loginRedirectRoute: string;
    logoutRedirectRoute: string;
    unauthorizedRedirectRoute: string;
    logLevel: number;
    userManagerSettings: UserManagerSettings;
}
