import { autoinject } from 'aurelia-framework';
import {
  NavigationInstruction,
  RouterConfiguration,
} from 'aurelia-router';
import OpenIdConnectAuthorizeStep from './open-id-connect-authorize-step';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectLogger from './open-id-connect-logger';
import OpenIdConnectNavigationStrategies from './open-id-connect-navigation-strategies';

@autoinject
export default class OpenIdConnectRouting {

  constructor(
    private openIdConnectConfiguration: OpenIdConnectConfigurationManager,
    private openIdConnectNavigationStrategies: OpenIdConnectNavigationStrategies,
    private $window: Window,
    // @ts-ignore
    private logger: OpenIdConnectLogger) { }

  public configureRouter(routerConfiguration: RouterConfiguration) {
    this.addLoginRedirectRoute(routerConfiguration);
    this.addLogoutRedirectRoute(routerConfiguration);
    routerConfiguration.addPipelineStep('authorize', OpenIdConnectAuthorizeStep);
  }

  private addLoginRedirectRoute(routerConfiguration: RouterConfiguration) {
    routerConfiguration.mapRoute({
      name: 'logInRedirectCallback',
      navigationStrategy: (instruction: NavigationInstruction) => {
        if (this.isSilentLogin()) {
          return this.openIdConnectNavigationStrategies.silentSignInCallback(instruction);
        } else {
          return this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction);
        }
      },
      route: this.getPath(this.openIdConnectConfiguration.redirectUri),
    });
  }

  private addLogoutRedirectRoute(routerConfiguration: RouterConfiguration) {
    routerConfiguration.mapRoute({
      name: 'logOutRedirectCallback',
      navigationStrategy: (instruction: NavigationInstruction) => {
        return this.openIdConnectNavigationStrategies.signOutRedirectCallback(instruction);
      },
      route: this.getPath(this.openIdConnectConfiguration.postLogoutRedirectUri),
    });
  }

  private isSilentLogin(): boolean {
    try {
      return this.$window.self !== this.$window.top;
    } catch (e) {
      return true;
    }
  }

  private getPath(uri: string): string {
    return this.convertUriToAnchor(uri).pathname;
  }

  private convertUriToAnchor(uri: string): HTMLAnchorElement {
    const anchor: HTMLAnchorElement = document.createElement('a');
    anchor.href = uri;
    return anchor;
  }
}
