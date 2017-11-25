import { UserManager, UserManagerSettings } from "oidc-client";
import { OpenIdConnectConfigurationDto } from ".";
import {
    OpenIdConnectConfiguration,
    OpenIdConnectLogger,
} from "./index-internal";

export default class {

    public createOpenIdConnectConfiguration(dto: OpenIdConnectConfigurationDto)
        : OpenIdConnectConfiguration {

        return new OpenIdConnectConfiguration(dto);
    }

    public createOpenIdConnectLogger(level: number): OpenIdConnectLogger {
        return new OpenIdConnectLogger(level);
    }

    public createUserManager(settings: UserManagerSettings): UserManager {
        return new UserManager(settings);
    }
}
