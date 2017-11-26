import { Container, FrameworkConfiguration } from "aurelia-framework";
import { assert } from "chai";
import { UserManager } from "oidc-client";
import sinon = require("sinon");
import {
    configure,
    OpenIdConnect,
    OpenIdConnectConfigurationDto,
} from "../src";
import {
    OpenIdConnectConfiguration,
    OpenIdConnectFactory,
    OpenIdConnectLogger,
} from "../src/index-internal";

describe("plugin", () => {

    // arrange
    const logger = sinon.createStubInstance(OpenIdConnectLogger);
    const configuration = sinon.createStubInstance(OpenIdConnectConfiguration);
    const userManager = sinon.createStubInstance(UserManager);
    const factory = sinon.createStubInstance(OpenIdConnectFactory);
    factory.createOpenIdConnectLogger.returns(logger);
    factory.createOpenIdConnectConfiguration.returns(configuration);
    factory.createUserManager.returns(userManager);

    const dependencyContainer = sinon.createStubInstance(Container);
    const frameworkConfig = sinon.createStubInstance(FrameworkConfiguration);
    frameworkConfig.container = dependencyContainer;

    const userDefinedConfiguration = {
        logLevel: 5,
        userManagerSettings: {},
    };
    const pluginCallback = sinon.stub().callsFake(() => userDefinedConfiguration);

    before(() => {
        // act
        configure(frameworkConfig, pluginCallback, factory);
    });

    const resourcesToAdd = [
        "./open-id-connect-user-block",
        "./open-id-connect-user-debug",
    ];

    it(`should add these to global resources \r\n\t${resourcesToAdd.join("\r\n\t")}`, () => {
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
            OpenIdConnectConfiguration,
            sinon.match.same(configuration));
    });

    it(`should register a Window instance with the DI container`, () => {
        // assert
        sinon.assert.calledWith(
            dependencyContainer.registerInstance,
            Window,
            window);
    });

    it(`should flow user-defined configuration to the Configuration builder`, () => {
        // assert
        sinon.assert.calledWith(
            factory.createOpenIdConnectConfiguration,
            sinon.match.same(userDefinedConfiguration));
    });

    it(`should flow user-defined configuration to the Logger builder`, () => {
        // assert
        sinon.assert.calledWith(
            factory.createOpenIdConnectLogger,
            sinon.match.same(userDefinedConfiguration.logLevel));
    });

    it(`should flow user-defined configuration to the UserManager builder`, () => {
        // assert
        sinon.assert.calledWith(
            factory.createUserManager,
            sinon.match.same(userDefinedConfiguration.userManagerSettings));
    });
});
