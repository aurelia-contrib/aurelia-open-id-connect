import { PLATFORM } from 'aurelia-framework';
import { UserManager } from 'oidc-client';
import { OpenIdConnectConfigurationManager } from './open-id-connect-configuration-manager';
import { OpenIdConnectFactory } from './open-id-connect-factory';
import { OpenIdConnectLogger } from './open-id-connect-logger';
const retrieveUserlandConfig = (callback) => {
    let config = {};
    if (!callback || callback.length > 1) {
        return config;
    }
    if (callback.length === 0) {
        config = callback();
        return config;
    }
    if (callback.length === 1) {
        callback(config);
        return config;
    }
    return config;
};
export function configure(frameworkConfig, callback, factory) {
    if (!factory) {
        factory = new OpenIdConnectFactory();
    }
    // register global resources
    frameworkConfig.globalResources([
        PLATFORM.moduleName('./open-id-connect-user-block'),
        PLATFORM.moduleName('./open-id-connect-user-debug'),
        PLATFORM.moduleName('./open-id-connect-navigation-value-converter'),
    ]);
    // retrieve user-land configuration
    const userConfig = retrieveUserlandConfig(callback);
    // register configuration
    const configManager = factory.createOpenIdConnectConfiguration(userConfig);
    frameworkConfig.container
        .registerInstance(OpenIdConnectConfigurationManager, configManager);
    // register logger
    const openIdConnectLogger = factory.createOpenIdConnectLogger(configManager.logLevel);
    frameworkConfig.container
        .registerInstance(OpenIdConnectLogger, openIdConnectLogger);
    // register userManager
    const userManager = factory.createUserManager(configManager.userManagerSettings);
    frameworkConfig.container
        .registerInstance(UserManager, userManager);
    // register window
    frameworkConfig.container.registerInstance(Window, window);
}
