import { autoinject } from 'aurelia-framework';
import { NavigationInstruction } from 'aurelia-router';
import { UserManager } from 'oidc-client';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import { LoginRedirectKey } from './open-id-connect-constants';
import OpenIdConnectLogger from './open-id-connect-logger';

// TODO: Move some of the route-definition logic from
// the open-id-connect-routing.ts file into this file instead.
// The current file, for instance, could define the
// { name, navigationStrategy, route } object instead of defining only
// the navigationStrategy implementation.
@autoinject
export default class OpenIdConnectNavigationStrategies {

  constructor(
    // @ts-ignore
    private logger: OpenIdConnectLogger,
    private openIdConnectConfiguration: OpenIdConnectConfigurationManager,
    private userManager: UserManager,
    private $window: Window) { }

  public async signInRedirectCallback(instruction: NavigationInstruction): Promise<any> {

    let redirectRoute = this.openIdConnectConfiguration.loginRedirectRoute;

    const callbackHandler = async () => {
      const args: any = {};
      const user = await this.userManager.signinRedirectCallback(args);

      // The state is not persisted with the rest of the user.
      // This callback is the only place we will be able to capture the state.
      if (user.state && user.state[LoginRedirectKey]) {
        redirectRoute = user.state[LoginRedirectKey];
      }
    };

    const navigationInstruction = () =>
      this.redirectAfterCallback(instruction, redirectRoute);

    return this.runHandlerAndCompleteNavigationInstruction(
      callbackHandler,
      navigationInstruction);
  }

  public silentSignInCallback(instruction: NavigationInstruction): Promise<any> {

    const callbackHandler = async () => {
      return this.userManager.signinSilentCallback();
    };

    const navigationInstruction = () => {
      // This happens in a child iframe.
      instruction.config.redirect = this.openIdConnectConfiguration.loginRedirectRoute;

      // TODO: Consider redirecting the parent window
      // to the loginRedirectRoute when the silent sign in completes.
    };

    return this.runHandlerAndCompleteNavigationInstruction(
      callbackHandler,
      navigationInstruction);
  }

  public signOutRedirectCallback(instruction: NavigationInstruction): Promise<any> {

    const callbackHandler = async () => {
      const args: any = {};
      return this.userManager.signoutRedirectCallback(args);
    };

    const navigationInstruction = () =>
      this.redirectAfterCallback(instruction, this.openIdConnectConfiguration.logoutRedirectRoute);

    return this.runHandlerAndCompleteNavigationInstruction(
      callbackHandler,
      navigationInstruction);
  }

  // Redirect to the specified route AND ensure that a page refresh does not
  // load the OIDC redirect callback url.
  // See https://github.com/aurelia-contrib/aurelia-open-id-connect/issues/46
  // See https://github.com/aurelia-contrib/aurelia-open-id-connect/issues/47
  private redirectAfterCallback(instruction: NavigationInstruction, route: string) {
    this.$window.history.pushState({}, '', route);
    instruction.config.redirect = route;
  }

  private async runHandlerAndCompleteNavigationInstruction(
    callbackHandler: () => Promise<any>,
    navigationInstruction: () => void): Promise<any> {

    try {
      this.logger.debug('Handling the response from the Identity Provider');
      await callbackHandler();
      this.logger.debug('Redirecting on authorization success');
      navigationInstruction();
    } catch (err) {
      this.logger.debug('Redirecting on authorization error');
      navigationInstruction();
      throw err;
    }
  }
}
