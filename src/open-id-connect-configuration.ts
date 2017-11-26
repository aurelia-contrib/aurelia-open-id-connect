import { UserManagerSettings } from "oidc-client";

export default interface OpenIdConnectConfigurationDto {
    [key: string]: any;
    loginRedirectModuleId: string;
    logoutRedirectModuleId: string;
    unauthorizedRedirectModuleId: string;
    logLevel: number;
    userManagerSettings: UserManagerSettings;
}
