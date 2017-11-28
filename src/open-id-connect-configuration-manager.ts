import { UserManagerSettings } from 'oidc-client';
import { OpenIdConnectConfiguration } from './index';

const defaultClientUri = 'https://localhost:9000';

export class OpenIdConnectConfigurationManager {

    [key: string]: any;

    // tslint:disable-next-line:variable-name
    private _loginRedirectModuleId: string = '/';
    // tslint:disable-next-line:variable-name
    private _logoutRedirectModuleId: string = '/';
    // tslint:disable-next-line:variable-name
    private _unauthorizedRedirectModuleId: '/';
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

    public get loginRedirectModuleId(): string {
        return this._loginRedirectModuleId;
    }

    public get logoutRedirectModuleId(): string {
        return this._logoutRedirectModuleId;
    }

    public get unauthorizedRedirectModuleId(): string {
        return this._unauthorizedRedirectModuleId;
    }

    public get logLevel(): number {
        return this._logLevel;
    }

    public get userManagerSettings(): UserManagerSettings {
        return this._userManagerSettings;
    }

    public get redirectUri(): string | undefined {
        return this._userManagerSettings.redirect_uri;
    }

    public get postLogoutRedirectUri(): string | undefined {
        return this._userManagerSettings.post_logout_redirect_uri;
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
