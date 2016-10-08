
import { UserManagerSettings, WebStorageStateStore, Global } from "oidc-client";

export class OpenIdConnectConfiguration {

    public static GetLocalWebStorageStateStore(): WebStorageStateStore {
        return new WebStorageStateStore({ store: Global.localStorage });
    }
    
    public LoginRedirectModuleId: string = "login";
    public LogoutRedirectModuleId: string = "logout";
    public UserManagerSettings: UserManagerSettings;
}
