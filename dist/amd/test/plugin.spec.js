define(["require", "exports", "aurelia-framework", "oidc-client", "sinon", "../src", "../src/index-internal"], function (require, exports, aurelia_framework_1, oidc_client_1, sinon, src_1, index_internal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('plugin', function () {
        var logger = sinon.createStubInstance(index_internal_1.OpenIdConnectLogger);
        var configurationManager = sinon.createStubInstance(index_internal_1.OpenIdConnectConfigurationManager);
        var userManager = sinon.createStubInstance(oidc_client_1.UserManager);
        var factory = sinon.createStubInstance(index_internal_1.OpenIdConnectFactory);
        factory.createOpenIdConnectLogger.returns(logger);
        factory.createOpenIdConnectConfiguration.returns(configurationManager);
        factory.createUserManager.returns(userManager);
        var dependencyContainer = sinon.createStubInstance(aurelia_framework_1.Container);
        var frameworkConfig = sinon.createStubInstance(aurelia_framework_1.FrameworkConfiguration);
        frameworkConfig.container = dependencyContainer;
        context('without user-defined configuration', function () {
            var expectedLogLevel = 100;
            var expectedUserManager = {};
            before(function () {
                sinon.stub(configurationManager, 'logLevel')
                    .get(function () { return expectedLogLevel; });
                sinon.stub(configurationManager, 'userManagerSettings')
                    .get(function () { return expectedUserManager; });
                src_1.configure(frameworkConfig, undefined, factory);
            });
            var resourcesToAdd = [
                './open-id-connect-user-block',
                './open-id-connect-user-debug',
                './open-id-connect-navigation-value-converter',
            ];
            it("should add these to global resources \r\n\t" + resourcesToAdd.join('\r\n\t'), function () {
                sinon.assert.calledWith(frameworkConfig.globalResources, resourcesToAdd);
            });
            it("should register an OpenIdConnectLogger with the DI container", function () {
                sinon.assert.calledWith(dependencyContainer.registerInstance, index_internal_1.OpenIdConnectLogger, sinon.match.same(logger));
            });
            it("should register a UserManager instance with the DI container", function () {
                sinon.assert.calledWith(dependencyContainer.registerInstance, oidc_client_1.UserManager, sinon.match.same(userManager));
            });
            it("should register an OpenIdConnectConfiguration instance with the DI container", function () {
                sinon.assert.calledWith(dependencyContainer.registerInstance, index_internal_1.OpenIdConnectConfigurationManager, sinon.match.same(configurationManager));
            });
            it("should register a Window instance with the DI container", function () {
                sinon.assert.calledWith(dependencyContainer.registerInstance, Window, window);
            });
            it("should flow ConfigurationManager.logLevel to the Logger builder", function () {
                sinon.assert.calledWith(factory.createOpenIdConnectLogger, sinon.match.same(expectedLogLevel));
            });
            it("should flow ConfigurationManagaer.userManagerSettings to the UserManager builder", function () {
                sinon.assert.calledWith(factory.createUserManager, sinon.match.same(expectedUserManager));
            });
            it("should flow empty object to the Configuration builder", function () {
                var isEmptyObject = function (obj) { return Object.keys(obj).length === 0; };
                sinon.assert.calledWith(factory.createOpenIdConnectConfiguration, sinon.match(isEmptyObject));
            });
        });
        context('with user-defined configuration', function () {
            var userDefinedConfiguration = {
                logLevel: 5,
                userManagerSettings: {},
            };
            var pluginCallbackV19 = function () { return userDefinedConfiguration; };
            var pluginCallbackV18 = function (config) {
                config.logLevel = userDefinedConfiguration.logLevel;
                config.userManagerSettings = userDefinedConfiguration.userManagerSettings;
            };
            var version = 0.19;
            [pluginCallbackV19, pluginCallbackV18].forEach(function (callback) {
                it("should flow v" + version + " user-defined configuration to the Configuration builder", function () {
                    src_1.configure(frameworkConfig, callback, factory);
                    sinon.assert.calledWith(factory.createOpenIdConnectConfiguration, sinon.match.same(userDefinedConfiguration));
                });
                version = version - 0.01;
            });
        });
    });
});
//# sourceMappingURL=plugin.spec.js.map