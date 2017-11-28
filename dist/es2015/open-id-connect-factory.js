import { UserManager } from 'oidc-client';
import { OpenIdConnectConfigurationManager } from './open-id-connect-configuration-manager';
import { OpenIdConnectLogger } from './open-id-connect-logger';
export class OpenIdConnectFactory {
    createOpenIdConnectConfiguration(dto) {
        return new OpenIdConnectConfigurationManager(dto);
    }
    createOpenIdConnectLogger(level) {
        return new OpenIdConnectLogger(level);
    }
    createUserManager(settings) {
        return new UserManager(settings);
    }
}
