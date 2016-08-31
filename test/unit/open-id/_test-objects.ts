import {
    RouterConfiguration,
    Router,
    RouteConfig,
    NavigationInstruction
} from "aurelia-router";

import {
    UserManager,
    UserManagerSettings,
    OpenId,
    OpenIdConfiguration,
    OpenIdRouterConfigurationService,
    OpenIdLogger,
} from "../../../src/open-id/open-id";

export const routerConfiguration = new RouterConfiguration();

export const navigationInstruction = <NavigationInstruction>{
    config: {}
};

export const openIdConfiguration: OpenIdConfiguration = <OpenIdConfiguration>{
    LoginRedirectModuleId: "login",
    LogoutRedirectModuleId: "login",
    UserManagerSettings: <UserManagerSettings>{
        authority: "http://localhost:12345",
        client_id: "Aurelia.OidcClientJs",
        post_logout_redirect_uri: "http://localhost:9000/foobar-signout-oidc",
        redirect_uri: "http://localhost:9000/foobar-signin-oidc",
        response_type: "id_token token",
        scope: "openid email roles",
        filterProtocolClaims: true, // TODO What is this?
        loadUserInfo: true,
    }
};

export const openIdRouterConfigurationService = new OpenIdRouterConfigurationService(openIdConfiguration);

export const openIdLogger = new OpenIdLogger();

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
