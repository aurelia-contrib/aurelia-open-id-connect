import { UserManager, UserManagerSettings } from 'oidc-client';
import { OpenIdConnectConfiguration } from './open-id-connect-configuration';
import { OpenIdConnectConfigurationManager } from './open-id-connect-configuration-manager';
import { OpenIdConnectLogger } from './open-id-connect-logger';

export class OpenIdConnectFactory {

    public createOpenIdConnectConfiguration(dto: OpenIdConnectConfiguration): OpenIdConnectConfigurationManager {

        return new OpenIdConnectConfigurationManager(dto);
    }

    public createOpenIdConnectLogger(level: number): OpenIdConnectLogger {
        return new OpenIdConnectLogger(level);
    }

    public createUserManager(settings: UserManagerSettings): UserManager {
        return new UserManager(settings);
    }
}
