import { UserManagerSettings, WebStorageStateStore } from "oidc-client";

export default class OpenIdConnectConfiguration {
    public loginRedirectModuleId: string;
    public logoutRedirectModuleId: string;
    public userManagerSettings: UserManagerSettings;

    constructor() {
        this.setDefaults();
    }

    private setDefaults() {

        const authority = "http://localhost:5000";
        const host = "https://zamboni-app.azurewebsites.net";

        this.loginRedirectModuleId = "home";
        this.logoutRedirectModuleId = "home";
        this.userManagerSettings = {
            authority,
            client_id: "Aurelia.OpenIdConnect",
            filterProtocolClaims: true, // todo: What is this?
            loadUserInfo: true,
            post_logout_redirect_uri: `${host}/signout-oidc`,
            redirect_uri: `${host}/signin-oidc`,
            response_type: "id_token token",
            scope: "openid email roles profile",
            silent_redirect_uri: `${host}/signin-oidc`,
        };
    }
}
