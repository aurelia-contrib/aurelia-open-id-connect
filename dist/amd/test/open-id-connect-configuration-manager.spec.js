define(["require", "exports", "chai", "oidc-client", "../src/index-internal"], function (require, exports, chai_1, oidc_client_1, index_internal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('open-id-connect-configuration-manager', function () {
        var expected = {
            loginRedirectModuleId: 'loginRedirectModuleId',
            logoutRedirectModuleId: 'logoutRedirectModuleId',
            logLevel: 5,
            userManagerSettings: {
                accessTokenExpiringNotificationTime: 1111111111111111,
                authority: 'authority',
                automaticSilentRenew: false,
                checkSessionInterval: 22222222222222222,
                client_id: 'dc0e8e79-e73c-4ad9-9743-b262320d77d6',
                filterProtocolClaims: true,
                loadUserInfo: false,
                post_logout_redirect_uri: 'post_logout',
                redirect_uri: 'redirect_uri',
                response_type: 'response_type',
                scope: 'scope',
                silentRequestTimeout: 3333333333333333,
                silent_redirect_uri: 'silent_redirect_uri',
                userStore: new oidc_client_1.WebStorageStateStore({
                    prefix: 'oidc',
                    store: window.localStorage,
                }),
            },
        };
        context('constructor', function () {
            context('when user values are defined', function () {
                var actual;
                before(function () {
                    actual = new index_internal_1.OpenIdConnectConfigurationManager(expected);
                });
                Object.keys(expected).forEach(function (key) {
                    if (key === 'userManagerSettings') {
                        return;
                    }
                    it("should override default " + key + " with user-defined values", function () {
                        chai_1.assert.equal(actual[key], expected[key]);
                    });
                });
                Object.keys(expected.userManagerSettings).forEach(function (key) {
                    it("should override default userManager." + key + " with user-defined values", function () {
                        chai_1.assert.equal(actual.userManagerSettings[key], expected.userManagerSettings[key]);
                    });
                });
            });
            it('should use default values when user-values are undefined', function () {
                var actual = new index_internal_1.OpenIdConnectConfigurationManager(undefined);
                chai_1.assert.equal(actual.loginRedirectModuleId, '/');
                chai_1.assert.equal(actual.userManagerSettings.scope, 'openid email roles profile');
            });
        });
    });
});
//# sourceMappingURL=open-id-connect-configuration-manager.spec.js.map