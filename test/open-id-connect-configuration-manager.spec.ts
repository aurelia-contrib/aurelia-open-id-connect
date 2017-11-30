import { assert } from 'chai';
import { UserManagerSettings, WebStorageStateStore } from 'oidc-client';
import { OpenIdConnectConfiguration } from '../src/index';
import { OpenIdConnectConfigurationManager } from '../src/index-internal';

describe('open-id-connect-configuration-manager', () => {

  // tslint:disable-next-line:no-object-literal-type-assertion
  const expected = {
    loginRedirectRoute: 'loginRedirectRoute',
    logoutRedirectRoute: 'logoutRedirectRoute',
    unauthorizedRedirectRoute: 'unauthorizedRedirectRoute',
    logLevel: 5,
    // tslint:disable-next-line:no-object-literal-type-assertion
    userManagerSettings: {
      accessTokenExpiringNotificationTime: 1111111111111111,
      authority: 'authority',
      automaticSilentRenew: true,
      checkSessionInterval: 22222222222222222,
      client_id: 'dc0e8e79-e73c-4ad9-9743-b262320d77d6',
      filterProtocolClaims: true,
      loadUserInfo: true,
      post_logout_redirect_uri: 'post_logout',
      redirect_uri: 'redirect_uri',
      response_type: 'response_type',
      scope: 'scope',
      silentRequestTimeout: 3333333333333333,
      silent_redirect_uri: 'silent_redirect_uri',
      userStore: new WebStorageStateStore({
        prefix: 'oidc',
        store: window.localStorage,
      }),
    } as UserManagerSettings,
  } as OpenIdConnectConfiguration;

  let configManager: OpenIdConnectConfigurationManager;
  before(() => {
    configManager = new OpenIdConnectConfigurationManager(expected);
  });

  context('constructor', () => {

    context('when user values are defined', () => {
      Object.keys(expected).forEach((key) => {
        if (key === 'userManagerSettings') {
          return;
        }

        it(`should override default ${key} with user-defined values`, () => {
          // assert
          assert.isOk(configManager[key]);
          assert.equal(configManager[key], expected[key]);
        });
      });

      Object.keys(expected.userManagerSettings).forEach((key) => {
        it(`should override default userManager.${key} with user-defined values`, () => {
          // assert
          assert.isOk((configManager as any).userManagerSettings[key]);
          assert.equal(
            (configManager as any).userManagerSettings[key],
            (expected as any).userManagerSettings[key]);
        });
      });
    });

    context('when user values are not present', () => {

      [null, undefined].forEach((value) => {

        // these are spot checks rather than exhaustive tests
        it(`should use default values when the entire configuration is ${value}`, () => {
          // arrange
          const noSettingsAtAll = value as any;
          // act
          const actual = new OpenIdConnectConfigurationManager(noSettingsAtAll);
          // assert
          assert.equal(actual.loginRedirectRoute, '/');
        });

        // these are spot checks rather than exhaustive tests
        it(`should use default values when the userManagerSettings property is ${value}`, () => {
          // arrange
          const noUserManagerSettings = { userManagerSettings: value } as any;
          // act
          const actual = new OpenIdConnectConfigurationManager(noUserManagerSettings);
          // assert
          assert.equal(actual.userManagerSettings.scope, 'openid email roles profile');
        });
      });
    });

    context('convenience properties that wrap UseManagerSettings properties', () => {
      it('redirectUri should return underlying redirect_uri', () => {
        // assert
        assert.equal(configManager.redirectUri, expected.userManagerSettings.redirect_uri);
      });

      it('postLogoutRedirectUri should return underlying post_logout_redirect_uri', () => {
        // assert
        assert.equal(
          configManager.postLogoutRedirectUri,
          expected.userManagerSettings.post_logout_redirect_uri);
      });
    });
  });
});
