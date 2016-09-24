
import { UserManagerSettings, WebStorageStateStore } from "oidc-client";

export class OpenIdConnectConfiguration {
    public LoginRedirectModuleId: string = "login";
    public LogoutRedirectModuleId: string = "logout";
    public UserManagerSettings: UserManagerSettings = <UserManagerSettings>{
        userStore: new WebStorageStateStore({ store: localStorage }),
    };
}

