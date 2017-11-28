import { UserManagerSettings } from 'oidc-client';
import { OpenIdConnectConfiguration } from './index';
export default class  {
    [key: string]: any;
    private _loginRedirectModuleId;
    private _logoutRedirectModuleId;
    private _unauthorizedRedirectModuleId;
    private _logLevel;
    private _userManagerSettings;
    readonly loginRedirectModuleId: string;
    readonly logoutRedirectModuleId: string;
    readonly unauthorizedRedirectModuleId: string;
    readonly logLevel: number;
    readonly userManagerSettings: UserManagerSettings;
    readonly redirectUri: string;
    readonly postLogoutRedirectUri: string;
    constructor(dto?: OpenIdConnectConfiguration);
}
