import { UserManagerSettings } from "oidc-client";

export default class OpenIdConnectConfiguration {
    public loginRedirectModuleId: string;
    public logoutRedirectModuleId: string;
    public userManagerSettings: UserManagerSettings;

    public get RedirectUri(): string {
        return this.userManagerSettings.redirect_uri;
    }

    public get PostLogoutRedirectUri(): string {
        return this.userManagerSettings.post_logout_redirect_uri;
    }

    constructor() {
        this.setDefaults();
    }

    private setDefaults() {

        const authority = "https://localhost:5000";
        const clientApp = "https://localhost:9000";

        this.loginRedirectModuleId = "home";
        this.logoutRedirectModuleId = "home";
        this.userManagerSettings = {
            authority,
            client_id: "Aurelia.OpenIdConnect",
            filterProtocolClaims: true, // todo: What is this?
            loadUserInfo: true,
            post_logout_redirect_uri: `${clientApp}/signout-oidc`,
            redirect_uri: `${clientApp}/signin-oidc`,
            response_type: "id_token token",
            scope: "openid email roles profile",
            silent_redirect_uri: `${clientApp}/signin-oidc`,
        };
    }
}
