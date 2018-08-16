import { UserManagerSettings } from 'oidc-client';
import { OpenIdConnectConfiguration } from './index';
export default class  {
    [key: string]: any;
    private _loginRedirectRoute;
    private _logoutRedirectRoute;
    private _unauthorizedRedirectRoute;
    private _logLevel;
    private _userManagerSettings;
    readonly loginRedirectRoute: string;
    readonly logoutRedirectRoute: string;
    readonly unauthorizedRedirectRoute: string;
    readonly logLevel: number;
    readonly userManagerSettings: UserManagerSettings;
    readonly redirectUri: string;
    readonly postLogoutRedirectUri: string;
    constructor(dto?: OpenIdConnectConfiguration);
    private ensureRouteValueBeginsWithSlash(key, val);
}
