import { UserManagerSettings } from "oidc-client";

export default interface OpenIdConnectConfigurationDto {
    [key: string]: any;
    loginRedirectModuleId: string;
    logoutRedirectModuleId: string;
    userManagerSettings: UserManagerSettings;
}
