import { UserManagerSettings } from "oidc-client";
export default class OpenIdConnectConfiguration {
    loginRedirectModuleId: string;
    logoutRedirectModuleId: string;
    userManagerSettings: UserManagerSettings;
}
