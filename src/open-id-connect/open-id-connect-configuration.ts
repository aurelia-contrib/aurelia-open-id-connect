import { UserManagerSettings } from "oidc-client";

export class OpenIdConnectConfiguration {
    public LoginRedirectModuleId: string = "login";
    public LogoutRedirectModuleId: string = "logout";
    public UserManagerSettings: UserManagerSettings;
}

