import { UserManagerSettings } from "oidc-client";

export class OpenIdConfiguration {
    public LoginRedirectModuleId: string = "login";
    public LogoutRedirectModuleId: string = "logout";
    public UserManagerSettings: UserManagerSettings;
}

