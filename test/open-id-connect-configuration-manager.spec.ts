import { assert } from "chai";
import { UserManagerSettings, WebStorageStateStore } from "oidc-client";
import { OpenIdConnectConfiguration } from "../src";
import { OpenIdConnectConfigurationManager } from "../src/index-internal";

describe("open-id-connect-configuration-manager", () => {

    const expected = {
        loginRedirectModuleId: "loginRedirectModuleId",
        logoutRedirectModuleId: "logoutRedirectModuleId",
        logLevel: 5,
        userManagerSettings: {
            accessTokenExpiringNotificationTime: 1111111111111111,
            authority: "authority",
            automaticSilentRenew: false,
            checkSessionInterval: 22222222222222222,
            client_id: "dc0e8e79-e73c-4ad9-9743-b262320d77d6",
            filterProtocolClaims: true,
            loadUserInfo: false,
            post_logout_redirect_uri: "post_logout",
            redirect_uri: "redirect_uri",
            response_type: "response_type",
            scope: "scope",
            silentRequestTimeout: 3333333333333333,
            silent_redirect_uri: "silent_redirect_uri",
            userStore: new WebStorageStateStore({
                prefix: "oidc",
                store: window.localStorage,
            }),
        } as UserManagerSettings,
    } as OpenIdConnectConfigurationManager;

    context("constructor", () => {

        context("when user values are defined", () => {
            let actual;
            before(() => {
                actual = new OpenIdConnectConfigurationManager(expected);
            });

            Object.keys(expected).forEach((key) => {
                if (key === "userManagerSettings") {
                    return;
                }

                it(`should override default ${key} with user-defined values`, () => {
                    // assert
                    assert.equal(actual[key], expected[key]);
                });
            });

            Object.keys(expected.userManagerSettings).forEach((key) => {
                it(`should override default userManager.${key} with user-defined values`, () => {
                    // assert
                    assert.equal(
                        actual.userManagerSettings[key],
                        expected.userManagerSettings[key]);
                });
            });
        });

        // these are spot checks rather than exhaustive tests
        it("should use default values when user-values are undefined", () => {
            // act
            const actual = new OpenIdConnectConfigurationManager(undefined);
            // assert
            assert.equal(actual.loginRedirectModuleId, "/");
            assert.equal(actual.userManagerSettings.scope, "openid email roles profile");
        });
    });
});
