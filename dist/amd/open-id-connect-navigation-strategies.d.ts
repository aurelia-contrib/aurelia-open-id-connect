import { NavigationInstruction } from "aurelia-router";
import { UserManager } from "oidc-client";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectLogger from "./open-id-connect-logger";
export default class OpenIdConnectNavigationStrategies {
    private logger;
    private openIdConnectConfiguration;
    private userManager;
    constructor(logger: OpenIdConnectLogger, openIdConnectConfiguration: OpenIdConnectConfiguration, userManager: UserManager);
    signInRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    silentSignICallback(instruction: NavigationInstruction): Promise<any>;
    signoutRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    private runHandlers(callbackHandler, postCallbackRedirect);
}
