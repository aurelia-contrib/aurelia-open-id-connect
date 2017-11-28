import { RouterConfiguration } from 'aurelia-router';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectLogger from './open-id-connect-logger';
import OpenIdConnectNavigationStrategies from './open-id-connect-navigation-strategies';
export default class OpenIdConnectRouting {
    private openIdConnectConfiguration;
    private openIdConnectNavigationStrategies;
    private $window;
    private logger;
    constructor(openIdConnectConfiguration: OpenIdConnectConfigurationManager, openIdConnectNavigationStrategies: OpenIdConnectNavigationStrategies, $window: Window, logger: OpenIdConnectLogger);
    configureRouter(routerConfiguration: RouterConfiguration): void;
    private addLoginRedirectRoute(routerConfiguration);
    private addLogoutRedirectRoute(routerConfiguration);
    private isSilentLogin();
    private getPath(uri);
    private convertUriToAnchor(uri);
}
