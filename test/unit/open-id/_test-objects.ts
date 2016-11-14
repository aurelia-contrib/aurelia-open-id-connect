import {
    RouterConfiguration,
    Router,
    RouteConfig,
    NavigationInstruction
} from "aurelia-router";

import {
    UserManager,
    UserManagerSettings,
    OpenIdConnect,
    OpenIdConnectConfiguration,
    OpenIdConnectRouting,
    OpenIdConnectLogger,
} from "../../../src/open-id-connect/index";

export const routerConfiguration = new RouterConfiguration();

export const navigationInstruction = <NavigationInstruction>{
    config: {}
};

export const openIdConnectConfiguration: OpenIdConnectConfiguration = <OpenIdConnectConfiguration>{
    LoginRedirectModuleId: "login",
    LogoutRedirectModuleId: "login",
    UserManagerSettings: <UserManagerSettings>{
        authority: "http://localhost:12345",
        client_id: "Aurelia.OpenIdConnect",
        post_logout_redirect_uri: "http://localhost:9000/foobar-signout-oidc",
        redirect_uri: "http://localhost:9000/foobar-signin-oidc",
        response_type: "id_token token",
        scope: "openid email roles",
        filterProtocolClaims: true, // todo: What is this?
        loadUserInfo: true,
    }
};

export const openIdConnectRouting = new OpenIdConnectRouting(openIdConnectConfiguration);

export const openIdConnectLogger = new OpenIdConnectLogger();

export const userManager = new UserManager();

export const EmptyPromise: Promise<any> = new Promise((resolve) => resolve());

export const MockUser: Promise<any> = new Promise((resolve, reject) => {
    let user = {};
    resolve();
});

export const wrapVoidPromise = (wrapped): Promise<any> => new Promise((resolve) => {
    wrapped();
    resolve();
});
