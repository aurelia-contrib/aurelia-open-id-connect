import { Container, FrameworkConfiguration } from 'aurelia-framework';
import { UserManager } from 'oidc-client';
// tslint:disable-next-line:no-implicit-dependencies
import sinon = require('sinon');
import {
  configure,
  OpenIdConnectConfiguration,
} from '../src';
import {
  OpenIdConnectConfigurationManager,
  OpenIdConnectFactory,
  OpenIdConnectLogger,
} from '../src/index-internal';

describe('plugin', () => {

  // arrange
  const logger = sinon.createStubInstance(OpenIdConnectLogger);
  const configurationManager = sinon.createStubInstance(OpenIdConnectConfigurationManager);
  const userManager = sinon.createStubInstance(UserManager);
  const factory = sinon.createStubInstance(OpenIdConnectFactory);
  factory.createOpenIdConnectLogger.returns(logger);
  factory.createOpenIdConnectConfiguration.returns(configurationManager);
  factory.createUserManager.returns(userManager);

  const dependencyContainer = sinon.createStubInstance(Container);
  const frameworkConfig = sinon.createStubInstance(FrameworkConfiguration);
  frameworkConfig.container = dependencyContainer;

  context('without user-defined configuration', () => {

    const expectedLogLevel = 100;
    const expectedUserManager = {};

    before(() => {
      // arrange
      sinon.stub(configurationManager, 'logLevel')
        .get(() => expectedLogLevel);

      sinon.stub(configurationManager, 'userManagerSettings')
        .get(() => expectedUserManager);

      // act
      configure(frameworkConfig, undefined, factory);
    });

    const resourcesToAdd = [
      './open-id-connect-user-block',
      './open-id-connect-user-debug',
      './open-id-connect-navigation-filter',
    ];

    it(`should add these to global resources \r\n\t${resourcesToAdd.join('\r\n\t')}`, () => {
      // assert
      sinon.assert.calledWith(frameworkConfig.globalResources, resourcesToAdd);
    });

    it(`should register an OpenIdConnectLogger with the DI container`, () => {
      // assert
      sinon.assert.calledWith(
        dependencyContainer.registerInstance,
        OpenIdConnectLogger,
        sinon.match.same(logger));
    });

    it(`should register a UserManager instance with the DI container`, () => {
      // assert
      sinon.assert.calledWith(
        dependencyContainer.registerInstance,
        UserManager,
        sinon.match.same(userManager));
    });

    it(`should register an OpenIdConnectConfiguration instance with the DI container`, () => {
      // assert
      sinon.assert.calledWith(
        dependencyContainer.registerInstance,
        OpenIdConnectConfigurationManager,
        sinon.match.same(configurationManager));
    });

    it(`should register a Window instance with the DI container`, () => {
      // assert
      sinon.assert.calledWith(
        dependencyContainer.registerInstance,
        Window,
        window);
    });

    it(`should flow ConfigurationManager.logLevel to the Logger builder`, () => {
      // assert
      sinon.assert.calledWith(
        factory.createOpenIdConnectLogger,
        sinon.match.same(expectedLogLevel));
    });

    it(`should flow ConfigurationManagaer.userManagerSettings to the UserManager builder`, () => {
      // assert
      sinon.assert.calledWith(
        factory.createUserManager,
        sinon.match.same(expectedUserManager));
    });

    it(`should flow empty object to the Configuration builder`, () => {
      // assert
      const isEmptyObject = (obj: any) => Object.keys(obj).length === 0;
      sinon.assert.calledWith(
        factory.createOpenIdConnectConfiguration,
        sinon.match(isEmptyObject));
    });
  });

  context('with user-defined configuration', () => {

    const userDefinedConfiguration = {
      logLevel: 5,
      userManagerSettings: {},
    };

    // we support two callback interfaces:
    // one started with version 0.19,
    // one lasted until version 0.18
    const pluginCallbackV19 = () => userDefinedConfiguration;
    const pluginCallbackV18 = (config: OpenIdConnectConfiguration) => {
      config.logLevel = userDefinedConfiguration.logLevel;
      config.userManagerSettings = userDefinedConfiguration.userManagerSettings;
    };

    let version = 0.19;
    [pluginCallbackV19, pluginCallbackV18].forEach((callback) => {
      it(`should flow v${version} user-defined configuration to the Configuration builder`, () => {
        // act
        configure(frameworkConfig, callback, factory);
        // assert
        sinon.assert.calledWith(
          factory.createOpenIdConnectConfiguration,
          sinon.match.same(userDefinedConfiguration));
      });

      version = version - 0.01;
    });

  });
});
