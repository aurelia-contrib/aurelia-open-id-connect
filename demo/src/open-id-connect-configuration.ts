import { OpenIdConnectConfiguration, UserManagerSettings, WebStorageStateStore } from "aurelia-open-id-connect";

let isDevelopment = window.location.host.startsWith("localhost");

let authority: string = isDevelopment
    ? "http://localhost:12345"
    : "https://zamboni-auth.azurewebsites.net";

let host: string = isDevelopment
    ? "http://localhost:9000"
    : "https://zamboni-app.azurewebsites.net";

const oidcConfig: OpenIdConnectConfiguration = {
    LoginRedirectModuleId: "home",
    LogoutRedirectModuleId: "home",
    UserManagerSettings: <UserManagerSettings> {
        authority: authority,
        client_id: "Aurelia.OpenIdConnect",
        filterProtocolClaims: true, // TODO What is this?
        loadUserInfo: true,
        post_logout_redirect_uri: `${host}/signout-oidc`,
        redirect_uri: `${host}/signin-oidc`,
        response_type: "id_token token",
        scope: "openid email roles profile",
        userStore: new WebStorageStateStore("oidc", window.localStorage),
    },
};

export default oidcConfig;
