import { OpenIdConnectConfiguration, UserManagerSettings, WebStorageStateStore } from "aurelia-open-id-connect";

let isDevelopment = window.location.host.startsWith("localhost");

let authority: string = isDevelopment
    ? "http://localhost:12345"
    : "https://zamboni-auth.azurewebsites.net";

let host: string = isDevelopment
    ? "http://localhost:9000"
    : "https://zamboni-app.azurewebsites.net";

const oidcConfig: OpenIdConnectConfiguration = {
    loginRedirectModuleId: "home",
    logoutRedirectModuleId: "home",
    userManagerSettings: <UserManagerSettings> {
        authority: authority,
        automaticSilentRenew: true,
        client_id: "Aurelia.OpenIdConnect",
        filterProtocolClaims: true, // todo: What is this?
        loadUserInfo: true,
        post_logout_redirect_uri: `${host}/signout-oidc`,
        redirect_uri: `${host}/signin-oidc`,
        response_type: "id_token token",
        scope: "openid email roles profile",
        silent_redirect_uri: `${host}/signin-oidc`,
        // silentRequestTimeout: 1000,
        userStore: new WebStorageStateStore("oidc", window.localStorage),
    },
};

export default oidcConfig;
