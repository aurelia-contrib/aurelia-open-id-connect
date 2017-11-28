define(["require", "exports", "aurelia-router", "sinon", "../src/index-internal"], function (require, exports, aurelia_router_1, sinon, index_internal_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('open-id-connect-routing', function () {
        var $window = {
            self: _this,
            top: _this,
        };
        var routerConfiguration = sinon.createStubInstance(aurelia_router_1.RouterConfiguration);
        var openIdConnectConfiguration = sinon.createStubInstance(index_internal_1.OpenIdConnectConfigurationManager);
        var openIdConnectNavigationStrategies = sinon.createStubInstance(index_internal_1.OpenIdConnectNavigationStrategies);
        var logger = sinon.createStubInstance(index_internal_1.OpenIdConnectLogger);
        var uriLeftPart = 'https://www.domain.tld';
        var signInPath = '/SIGN_IN';
        var signOutPath = '/SIGN_OUT';
        var redirectUri = "" + uriLeftPart + signInPath;
        var postLogoutRedirectUri = "" + uriLeftPart + signOutPath;
        sinon.stub(openIdConnectConfiguration, 'redirectUri').get(function () { return redirectUri; });
        sinon.stub(openIdConnectConfiguration, 'postLogoutRedirectUri').get(function () { return postLogoutRedirectUri; });
        var openIdConnectRouting = new index_internal_1.OpenIdConnectRouting(openIdConnectConfiguration, openIdConnectNavigationStrategies, $window, logger);
        context('configureRouter', function () {
            var getMapRouteArgument = function (route) { return routerConfiguration.mapRoute
                .getCalls()
                .map(function (c) { return c.args[0]; })
                .find(function (a) { return a.route === route; }); };
            before(function () {
                openIdConnectRouting.configureRouter(routerConfiguration);
            });
            context('redirect_uri', function () {
                var navigationStrategy;
                before(function () {
                    var arg = getMapRouteArgument(signInPath);
                    navigationStrategy = arg.navigationStrategy;
                });
                it('should map route for the configured path', function () {
                    sinon.assert.calledWith(routerConfiguration.mapRoute, sinon.match.has('route', signInPath));
                });
                it('should use redirect signin strategy during redirection', function () {
                    openIdConnectNavigationStrategies.silentSignInCallback.reset();
                    openIdConnectNavigationStrategies.signInRedirectCallback.reset();
                    $window.self = $window;
                    $window.top = $window;
                    navigationStrategy({});
                    sinon.assert.notCalled(openIdConnectNavigationStrategies.silentSignInCallback);
                    sinon.assert.calledOnce(openIdConnectNavigationStrategies.signInRedirectCallback);
                });
                it('should use silent signin strategy during iFrame redirection', function () {
                    openIdConnectNavigationStrategies.silentSignInCallback.reset();
                    openIdConnectNavigationStrategies.signInRedirectCallback.reset();
                    $window.self = 'iframe';
                    $window.top = $window;
                    navigationStrategy({});
                    sinon.assert.calledOnce(openIdConnectNavigationStrategies.silentSignInCallback);
                    sinon.assert.notCalled(openIdConnectNavigationStrategies.signInRedirectCallback);
                });
            });
            context('post_logout_redirect_uri', function () {
                it('should map route for the configured path', function () {
                    sinon.assert.calledWith(routerConfiguration.mapRoute, sinon.match.has('route', signOutPath));
                });
            });
        });
    });
});
//# sourceMappingURL=open-id-connect-routing.spec.js.map