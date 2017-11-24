import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import { OpenIdConnectConfiguration } from ".";
import { OpenIdConnectLogger } from "./index-internal";
export default class OpenIdConnectNavigationStrategies {
    private logger;
    private openIdConnectConfiguration;
    private userManager;
    constructor(logger: OpenIdConnectLogger, openIdConnectConfiguration: OpenIdConnectConfiguration, userManager: UserManager);
    signInRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    silentSignInCallback(instruction: NavigationInstruction): Promise<any>;
    signOutRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    private runHandlerAndAlwaysRedirect(callbackHandler, postCallbackRedirect);
}
