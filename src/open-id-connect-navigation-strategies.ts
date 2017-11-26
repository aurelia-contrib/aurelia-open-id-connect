import { autoinject } from "aurelia-framework";
import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectConfigurationManager from "./open-id-connect-configuration-manager";
import OpenIdConnectLogger from "./open-id-connect-logger";

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
        private userManager: UserManager) { }

    public async signInRedirectCallback(instruction: NavigationInstruction): Promise<any> {
        const callbackHandler = async () => {
            const args: any = {};
            return this.userManager.signinRedirectCallback(args);
        };

        const navigationInstruction = () => {
            instruction.config.redirect =
                this.openIdConnectConfiguration.loginRedirectModuleId;
        };

        return this.runHandlerAndCompleteNavigationInstruction(
            callbackHandler,
            navigationInstruction);
    }

    public silentSignInCallback(instruction: NavigationInstruction): Promise<any> {

        const callbackHandler = async () => {
            // The url must be null;
            // otherwise, IFrameWindow.notifyParent will not work,
            // And we will receive one of two errors:
            // 'No matching state found in storage' or
            // 'No state in response'
            const url: string = null;
            return this.userManager.signinSilentCallback(url);
        };

        const navigationInstruction = () => {
            // TODO: Use more expressive code to perform the iframe no-op.
            instruction.config.redirect = "THIS_HAPPENS_IN_A_CHILD_IFRAME";
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

        const navigationInstruction = () => {
            instruction.config.redirect =
                this.openIdConnectConfiguration.logoutRedirectModuleId;
        };

        return this.runHandlerAndCompleteNavigationInstruction(
            callbackHandler,
            navigationInstruction);
    }

    private async runHandlerAndCompleteNavigationInstruction(
        callbackHandler: () => Promise<any>,
        navigationInstruction: () => void): Promise<any> {

        try {
            this.logger.debug("Handling the response from the Identity Provider");
            await callbackHandler();
            this.logger.debug("Redirecting on authorization success");
            navigationInstruction();
        } catch (err) {
            this.logger.debug("Redirecting on authorization error");
            navigationInstruction();
            throw err;
        }
    }
}
