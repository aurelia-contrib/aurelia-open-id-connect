import { FrameworkConfiguration, PLATFORM } from 'aurelia-framework';
import { UserManager } from 'oidc-client';
import OpenIdConnectConfiguration from './open-id-connect-configuration';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectFactory from './open-id-connect-factory';
import OpenIdConnectLogger from './open-id-connect-logger';

export interface CallbackV19 extends Function {
  (): OpenIdConnectConfiguration;
}

export interface CallbackV18 extends Function {
  (config: OpenIdConnectConfiguration): void;
}

export type PluginCallback = CallbackV18 | CallbackV19;

const retrieveUserlandConfig = (callback?: PluginCallback): OpenIdConnectConfiguration => {
  let config = new OpenIdConnectConfiguration();

  if (!callback || callback.length > 1) {
    return config;
  }

  if (callback.length === 0) {
    config = (callback as CallbackV19)();
    return config;
  }

  (callback as CallbackV18)(config);
  return config;
};

export default function (
  frameworkConfig: FrameworkConfiguration,
  callback?: PluginCallback,
  factory?: OpenIdConnectFactory) {

  if (!factory) {
    factory = new OpenIdConnectFactory();
  }

  // register global resources
  frameworkConfig.globalResources([
    PLATFORM.moduleName('./open-id-connect-user-block'),
    PLATFORM.moduleName('./open-id-connect-user-debug'),
    PLATFORM.moduleName('./open-id-connect-navigation-filter'),
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
