import { RouterConfiguration } from 'aurelia-router';
// tslint:disable-next-line:no-implicit-dependencies
import sinon = require('sinon');
import {
    OpenIdConnectConfigurationManager,
    OpenIdConnectLogger,
    OpenIdConnectNavigationStrategies,
    OpenIdConnectRouting,
} from '../src/index-internal';

describe('open-id-connect-routing', () => {

    const $window: any = {
        self: this,
        top: this,
    };

    const routerConfiguration =
        sinon.createStubInstance(RouterConfiguration);

    const openIdConnectConfiguration =
        sinon.createStubInstance(OpenIdConnectConfigurationManager);

    const openIdConnectNavigationStrategies =
        sinon.createStubInstance(OpenIdConnectNavigationStrategies);

    const logger =
        sinon.createStubInstance(OpenIdConnectLogger);

    const uriLeftPart = 'https://www.domain.tld';

    // paths that follow the authority component must start with a slash.
    // https://tools.ietf.org/html/rfc3986#section-3.3
    const signInPath = '/SIGN_IN';
    const signOutPath = '/SIGN_OUT';

    const redirectUri = `${uriLeftPart}${signInPath}`;
    const postLogoutRedirectUri = `${uriLeftPart}${signOutPath}`;

    sinon.stub(openIdConnectConfiguration, 'redirectUri').get(() => redirectUri);
    sinon.stub(openIdConnectConfiguration, 'postLogoutRedirectUri').get(() => postLogoutRedirectUri);

    const openIdConnectRouting = new OpenIdConnectRouting(
        openIdConnectConfiguration,
        openIdConnectNavigationStrategies,
        $window,
        logger);

    context('configureRouter', () => {

        const getMapRouteArgument = (route: string) => (routerConfiguration.mapRoute as sinon.SinonStub)
            .getCalls()
            .map((c) => c.args[0])
            .find((a) => a.route === route);

        before(() => {
            openIdConnectRouting.configureRouter(routerConfiguration);
        });

        context('redirect_uri', () => {

            let navigationStrategy: any;

            before(() => {
                const arg = getMapRouteArgument(signInPath);
                navigationStrategy = arg.navigationStrategy;
            });

            it('should map route for the configured path', () => {
                // assert
                sinon.assert.calledWith(
                    routerConfiguration.mapRoute,
                    sinon.match.has('route', signInPath));
            });

            it('should use redirect signin strategy during redirection', () => {
                // arrange
                openIdConnectNavigationStrategies.silentSignInCallback.reset();
                openIdConnectNavigationStrategies.signInRedirectCallback.reset();

                // mimic working in top level window
                $window.self = $window;
                $window.top = $window;

                // act
                navigationStrategy({});

                // assert
                sinon.assert.notCalled(
                    openIdConnectNavigationStrategies.silentSignInCallback);

                sinon.assert.calledOnce(
                    openIdConnectNavigationStrategies.signInRedirectCallback);
            });

            it('should use silent signin strategy during iFrame redirection', () => {
                // arrange
                openIdConnectNavigationStrategies.silentSignInCallback.reset();
                openIdConnectNavigationStrategies.signInRedirectCallback.reset();

                // mimic working in an iframe
                $window.self = 'iframe';
                $window.top = $window;

                // act
                navigationStrategy({});

                // assert
                sinon.assert.calledOnce(
                    openIdConnectNavigationStrategies.silentSignInCallback);

                sinon.assert.notCalled(
                    openIdConnectNavigationStrategies.signInRedirectCallback);
            });
        });

        context('post_logout_redirect_uri', () => {
            it('should map route for the configured path', () => {
                // assert
                sinon.assert.calledWith(
                    routerConfiguration.mapRoute,
                    sinon.match.has('route', signOutPath));
            });
        });
    });
});
