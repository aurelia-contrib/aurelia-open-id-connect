import { PLATFORM } from 'aurelia-framework';
import { UserManager } from 'oidc-client';
import OpenIdConnectConfiguration from './open-id-connect-configuration';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectFactory from './open-id-connect-factory';
import OpenIdConnectLogger from './open-id-connect-logger';
const retrieveUserlandConfig = (callback) => {
    let config = new OpenIdConnectConfiguration();
    if (!callback || callback.length > 1) {
        return config;
    }
    if (callback.length === 0) {
        config = callback();
        return config;
    }
    callback(config);
    return config;
};
export default function (frameworkConfig, callback, factory) {
    if (!factory) {
        factory = new OpenIdConnectFactory();
    }
    frameworkConfig.globalResources([
        PLATFORM.moduleName('./open-id-connect-user-block'),
        PLATFORM.moduleName('./open-id-connect-user-debug'),
        PLATFORM.moduleName('./open-id-connect-navigation-filter'),
    ]);
    const userConfig = retrieveUserlandConfig(callback);
    const configManager = factory.createOpenIdConnectConfiguration(userConfig);
    frameworkConfig.container
        .registerInstance(OpenIdConnectConfigurationManager, configManager);
    const openIdConnectLogger = factory.createOpenIdConnectLogger(configManager.logLevel);
    frameworkConfig.container
        .registerInstance(OpenIdConnectLogger, openIdConnectLogger);
    const userManager = factory.createUserManager(configManager.userManagerSettings);
    frameworkConfig.container
        .registerInstance(UserManager, userManager);
    frameworkConfig.container.registerInstance(Window, window);
}
//# sourceMappingURL=plugin.js.map