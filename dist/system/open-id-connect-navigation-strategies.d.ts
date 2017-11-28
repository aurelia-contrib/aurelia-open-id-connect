import { NavigationInstruction } from 'aurelia-router';
import { UserManager } from 'oidc-client';
import { OpenIdConnectConfigurationManager } from './open-id-connect-configuration-manager';
import { OpenIdConnectLogger } from './open-id-connect-logger';
export declare class OpenIdConnectNavigationStrategies {
    private logger;
    private openIdConnectConfiguration;
    private userManager;
    constructor(logger: OpenIdConnectLogger, openIdConnectConfiguration: OpenIdConnectConfigurationManager, userManager: UserManager);
    signInRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    silentSignInCallback(instruction: NavigationInstruction): Promise<any>;
    signOutRedirectCallback(instruction: NavigationInstruction): Promise<any>;
    private runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
}
