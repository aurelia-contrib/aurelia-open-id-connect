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
        // number of seconds in advance of access token expiry
        // to raise the access token expiring event
        accessTokenExpiringNotificationTime: "1",
        authority: authority,
        automaticSilentRenew: true,
        // interval in milliseconds to check the user's session
        checkSessionInterval: 10000,
        client_id: "Aurelia.OpenIdConnect",
        filterProtocolClaims: true,
        loadUserInfo: true,
        post_logout_redirect_uri: `${host}/signout-oidc`,
        redirect_uri: `${host}/signin-oidc`,
        response_type: "id_token token",
        scope: "openid email roles profile",
        // number of millisecods to wait for the authorization
        // server to response to silent renew request
        silentRequestTimeout: 1000,
        silent_redirect_uri: `${host}/signin-oidc`,
        userStore: new WebStorageStateStore("oidc", window.localStorage),
    },
};

export default oidcConfig;
