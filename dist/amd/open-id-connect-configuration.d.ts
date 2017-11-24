import { UserManagerSettings } from "oidc-client";
export default class OpenIdConnectConfiguration {
    loginRedirectModuleId: string;
    logoutRedirectModuleId: string;
    userManagerSettings: UserManagerSettings;
    readonly LogoutRedirectModuleId: string;
    readonly LoginRedirectModuleId: string;
    readonly UserManagerSettings: UserManagerSettings;
    readonly RedirectUri: string;
    readonly PostLogoutRedirectUri: string;
    constructor();
    private setDefaults();
}
