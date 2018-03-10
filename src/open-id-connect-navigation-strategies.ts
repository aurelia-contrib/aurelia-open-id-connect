import { autoinject } from 'aurelia-framework';
import { NavigationInstruction } from 'aurelia-router';
import { UserManager } from 'oidc-client';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
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
    const callbackHandler = async () => {
      const args: any = {};
      return this.userManager.signinRedirectCallback(args).then((user) => {
        // The state is not persisted with the rest of the user.
        // The resolve callback is the only place you will be able to capture that state.
        // When the state is set, redirect to this request route.
        this.$window.location.assign(user.state || this.openIdConnectConfiguration.loginRedirectRoute);
      });
    };

    const navigationInstruction = () => {
      // Use location.assign not instruction.config.redirect,
      // because the former adds the route to the web browser's history,
      // and that controls what will load on a page refresh.
      // See https://github.com/aurelia-contrib/aurelia-open-id-connect/issues/46
      this.$window.location.assign(this.openIdConnectConfiguration.loginRedirectRoute);
    };

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
    };

    return this.runHandlerAndCompleteNavigationInstruction(
      callbackHandler,
      navigationInstruction);
  }

  public signOutRedirectCallback(instruction: NavigationInstruction): Promise<any> {

    const callbackHandler = async () => {
      const args: any = {};
      return this.userManager.signoutRedirectCallback(args).then(() => {
        this.$window.location.assign(this.openIdConnectConfiguration.logoutRedirectRoute);
      });
    };

    const navigationInstruction = () => {
      this.$window.location.assign(this.openIdConnectConfiguration.logoutRedirectRoute);
    };

    return this.runHandlerAndCompleteNavigationInstruction(
      callbackHandler,
      navigationInstruction);
  }

  private async runHandlerAndCompleteNavigationInstruction(
    callbackHandler: () => Promise<any>,
    navigationInstruction: () => void): Promise<any> {

    try {
      this.logger.debug('Handling the response from the Identity Provider');
      await callbackHandler();
    } catch (err) {
      this.logger.debug('Redirecting on authorization error');
      navigationInstruction();
      throw err;
    }
  }
}
