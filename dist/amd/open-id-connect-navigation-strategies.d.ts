import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
export default class OpenIdConnectNavigationStrategies {
    private logger;
    private openIdConnectConfiguration;
    private userManager;
    constructor(logger: OpenIdConnectLogger, openIdConnectConfiguration: OpenIdConnectConfiguration, userManager: UserManager);
    login(instruction: NavigationInstruction): Promise<any>;
    logout(instruction: NavigationInstruction): Promise<any>;
    signInRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    silentSignICallback(instruction: NavigationInstruction): Promise<any>;
    signoutRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    private runHandlers(callbackHandler, postCallbackRedirect);
    private setRequiredNavigationInstructions(instruction);
}
