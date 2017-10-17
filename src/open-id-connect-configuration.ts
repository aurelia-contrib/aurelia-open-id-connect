import { UserManagerSettings, WebStorageStateStore } from "oidc-client";

const isDevelopment = window.location.host.startsWith("localhost");

const authority: string = isDevelopment
    ? "http://localhost:5000"
    : "https://zamboni-auth.azurewebsites.net";

const host: string = isDevelopment
    ? "http://localhost:9000"
    : "https://zamboni-app.azurewebsites.net";

export default class OpenIdConnectConfiguration {
    public loginRedirectModuleId: string = "home";
    public logoutRedirectModuleId: string = "home";
    public userManagerSettings: UserManagerSettings = {
        authority,
        client_id: "Aurelia.OpenIdConnect",
        filterProtocolClaims: true, // todo: What is this?
        loadUserInfo: true,
        post_logout_redirect_uri: `${host}/signout-oidc`,
        redirect_uri: `${host}/signin-oidc`,
        response_type: "id_token token",
        scope: "openid email roles profile",
        silent_redirect_uri: `${host}/signin-oidc`,
        userStore: new WebStorageStateStore({
            prefix: "oidc",
            store: window.localStorage,
        }),
    };
}
