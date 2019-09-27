import { NavigationInstruction, Next, PipelineStep } from 'aurelia-router';
import { UserManager } from 'oidc-client';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectLogger from './open-id-connect-logger';
export default class OpenIdConnectAuthorizeStep implements PipelineStep {
    private userManager;
    private configuration;
    private logger;
    constructor(userManager: UserManager, configuration: OpenIdConnectConfigurationManager, logger: OpenIdConnectLogger);
    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any>;
    private requiresRole(navigationInstruction, role);
}
