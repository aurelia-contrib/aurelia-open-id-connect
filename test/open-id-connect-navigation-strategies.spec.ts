import { NavigationInstruction } from 'aurelia-router';
import { assert } from 'chai';
import { UserManager } from 'oidc-client';
import sinon = require('sinon');
import {
  OpenIdConnectConfigurationManager,
  OpenIdConnectLogger,
  OpenIdConnectNavigationStrategies,
} from '../src/index-internal';

describe('open-id-connect-navigation-strategies', () => {

  const logger = sinon.createStubInstance(OpenIdConnectLogger);
  const configuration = sinon.createStubInstance(OpenIdConnectConfigurationManager);
  const userManager = sinon.createStubInstance(UserManager);
  const instruction = sinon.createStubInstance(NavigationInstruction);

  const $window: any = {
    history: {
      pushState: sinon.spy(),
    },
  };

  const loginRedirectRoute = 'login';
  sinon.stub(configuration, 'loginRedirectRoute').get(() => loginRedirectRoute);

  const logoutRedirectRoute = 'logout';
  sinon.stub(configuration, 'logoutRedirectRoute').get(() => logoutRedirectRoute);

  userManager.signinRedirectCallback = sinon.stub().resolves({});
  userManager.signoutRedirectCallback = sinon.stub().resolves();

  instruction.config = {};

  const strategies = new OpenIdConnectNavigationStrategies(
    logger,
    configuration,
    userManager,
    $window,
  );

  [
    {
      delegatesTo: 'signinRedirectCallback',
      method: 'signInRedirectCallback',
      redirectsTo: loginRedirectRoute,
    },
    {
      delegatesTo: 'signoutRedirectCallback',
      method: 'signOutRedirectCallback',
      redirectsTo: logoutRedirectRoute,
    },
    {
      delegatesTo: 'signinSilentCallback',
      method: 'silentSignInCallback',
      redirectsTo: loginRedirectRoute,
    },
  ].forEach((o) => {

    context(o.method, () => {

      it(`should forward call to userManager > ${o.delegatesTo}`, async () => {
        // act
        await (strategies as any)[o.method](instruction);
        // assert
        sinon.assert.calledOnce(userManager[o.delegatesTo]);
      });

      it(`should redirect to ${o.redirectsTo} on success`, async () => {
        // act
        await (strategies as any)[o.method](instruction);
        // assert
        sinon.assert.calledWith($window.history.pushState, {}, '', o.redirectsTo);
        assert.equal(instruction.config.redirect, o.redirectsTo);
      });

      it(`should redirect to ${o.redirectsTo} on error`, async () => {
        // arrange
        const stub = userManager[o.delegatesTo] as sinon.SinonStub;
        stub.throwsException();

        let threwError = false;
        try {
          // act
          await (strategies as any)[o.method](instruction);
        } catch (err) {
          threwError = true;
        } finally {
          // assert
          assert.isTrue(threwError);
          sinon.assert.calledWith($window.history.pushState, {}, '', o.redirectsTo);
          assert.equal(instruction.config.redirect, o.redirectsTo);
        }
      });
    });
  });

  context('when user state contains loginRedirect', () => {
    afterEach(() => {
      userManager.signinRedirectCallback.reset();
    });

    it('should assign loginRedirect to window.location', async () => {
      // arrange
      const expected = 'some-login-redirect-value';
      userManager.signinRedirectCallback.resolves({
        state: {
          loginRedirect: expected,
        },
      });

      // act
      await strategies.signInRedirectCallback(instruction);

      // assert
      sinon.assert.calledWith($window.history.pushState, {}, '', expected);
      assert.equal(instruction.config.redirect, expected);
    });
  });
});
