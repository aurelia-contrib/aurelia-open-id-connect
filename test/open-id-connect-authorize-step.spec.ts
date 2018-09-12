import {
  NavigationInstruction,
  NavigationInstructionInit,
  Redirect,
} from 'aurelia-router';
import { UserManager } from 'oidc-client';
import sinon = require('sinon');
import { OpenIdConnectRoles } from '../src';
import {
  OpenIdConnectAuthorizeStep,
  OpenIdConnectConfigurationManager,
  OpenIdConnectLogger,
} from '../src/index-internal';

describe('open-id-connect-authorize-step', () => {

  const unauthRedirectRoute = '/you-shall-not-pass';
  const windowLocationBeforeRedirect = 'https://www.some-original-url.foo/bar/baz';
  const expectedRedirect = '/you-shall-not-pass?loginRedirect=https%3A%2F%2Fwww.some-original-url.foo%2Fbar%2Fbaz';

  const logger = sinon.createStubInstance(OpenIdConnectLogger);
  const configuration = sinon.createStubInstance(OpenIdConnectConfigurationManager);
  const userManager = sinon.createStubInstance(UserManager);

  const $window: any = {
    location: {
      href: windowLocationBeforeRedirect,
    },
  };

  sinon.stub(configuration, 'unauthorizedRedirectRoute').get(() => unauthRedirectRoute);

  const authorizationStep = new OpenIdConnectAuthorizeStep(
    userManager,
    configuration,
    logger,
    $window);

  const navigationInstruction = sinon.createStubInstance(NavigationInstruction);

  const createConfigForRoles = (...roles: OpenIdConnectRoles[]) => {
    // tslint:disable-next-line:no-object-literal-type-assertion
    return {
      config: {
        settings: {
          roles,
        },
      },
    } as NavigationInstructionInit;
  };

  // Is there a better way to spy on/stub a function that has properties/methods?
  const next = Object.assign(
    sinon.spy(),
    {
      cancel: sinon.spy(),
    },
  ) as any;

  context('run', () => {

    context('if navigation instruction requires the Authenticated role', () => {

      const instruction = new NavigationInstruction(
        createConfigForRoles(OpenIdConnectRoles.Authenticated));

      (navigationInstruction.getAllInstructions).returns([instruction]);

      it(`should redirect to ${unauthRedirectRoute} if user is null`, async () => {
        // arrange
        (userManager.getUser).returns(null);
        // act
        await authorizationStep.run(navigationInstruction, next);
        // assert
        sinon.assert.calledWithMatch(next.cancel, sinon.match.instanceOf(Redirect));
      });

      it(`should redirect to ${unauthRedirectRoute} if user is expired`, async () => {
        // arrange
        (userManager.getUser).returns({ expired: true });
        // act
        await authorizationStep.run(navigationInstruction, next);
        // assert
        sinon.assert.calledWithMatch(next.cancel, sinon.match.instanceOf(Redirect));
      });

      it(`redirect should be to the unauthorized route with original URL as LoginRedirect parameter`, async () => {
        // arrange
        (userManager.getUser).returns(null);
        // act
        await authorizationStep.run(navigationInstruction, next);
        // assert
        sinon.assert.calledWith(next.cancel, new Redirect(expectedRedirect));
      });

      it(`should NOT redirect to ${unauthRedirectRoute} if user is not null and not expired`, async () => {
        // arrange
        (userManager.getUser).returns({});
        // act
        await authorizationStep.run(navigationInstruction, next);
        // assert
        sinon.assert.calledOnce(next);
      });
    });
  });
});
