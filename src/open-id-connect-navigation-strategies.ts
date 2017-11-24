import { autoinject } from "aurelia-framework";
import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdConnectConfiguration } from ".";
import { OpenIdConnectLogger } from "./index-internal";

@autoinject
export default class OpenIdConnectNavigationStrategies {

    constructor(
        // @ts-ignore
        private logger: OpenIdConnectLogger,
        private openIdConnectConfiguration: OpenIdConnectConfiguration,
        private userManager: UserManager) { }

    public async signInRedirectCallback(instruction: NavigationInstruction): Promise<any> {
        const callbackHandler = async () => {
            const args: any = {};
            return this.userManager.signinRedirectCallback(args);
        };

        const postCallbackRedirect = () => {
            instruction.config.moduleId =
                this.openIdConnectConfiguration.LoginRedirectModuleId;
        };

        return this.runHandlerAndAlwaysRedirect(callbackHandler, postCallbackRedirect);
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

        const postCallbackRedirect = () => {
            instruction.config.moduleId = "THIS_HAPPENS_IN_A_CHILD_IFRAME";
        };

        return this.runHandlerAndAlwaysRedirect(callbackHandler, postCallbackRedirect);
    }

    // TODO: Handle the "No end session endpoint url returned" error.
    public signOutRedirectCallback(instruction: NavigationInstruction): Promise<any> {

        const callbackHandler = async () => {
            const args: any = {};
            return this.userManager.signoutRedirectCallback(args);
        };

        const postCallbackRedirect = () => {
            instruction.config.moduleId =
                this.openIdConnectConfiguration.LogoutRedirectModuleId;
        };

        return this.runHandlerAndAlwaysRedirect(callbackHandler, postCallbackRedirect);
    }

    private async runHandlerAndAlwaysRedirect(
        callbackHandler: () => Promise<any>,
        postCallbackRedirect: () => void): Promise<any> {

        try {
            this.logger.debug("Handling the response from the Identity Provider");
            await callbackHandler();
            this.logger.debug("Redirecting on authorization success");
            postCallbackRedirect();
        } catch (err) {
            this.logger.debug("Redirecting on authorization error");
            postCallbackRedirect();
            throw err;
        }
    }
}
