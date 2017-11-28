import { UserManager, UserManagerSettings } from 'oidc-client';
import { OpenIdConnectConfiguration } from './open-id-connect-configuration';
import { OpenIdConnectConfigurationManager } from './open-id-connect-configuration-manager';
import { OpenIdConnectLogger } from './open-id-connect-logger';
export declare class OpenIdConnectFactory {
    createOpenIdConnectConfiguration(dto: OpenIdConnectConfiguration): OpenIdConnectConfigurationManager;
    createOpenIdConnectLogger(level: number): OpenIdConnectLogger;
    createUserManager(settings: UserManagerSettings): UserManager;
}
