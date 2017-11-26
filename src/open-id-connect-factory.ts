import { UserManager, UserManagerSettings } from "oidc-client";
import { OpenIdConnectConfiguration } from ".";
import {
    OpenIdConnectConfigurationManager,
    OpenIdConnectLogger,
} from "./index-internal";

export default class {

    public createOpenIdConnectConfiguration(dto: OpenIdConnectConfiguration)
        : OpenIdConnectConfigurationManager {

        return new OpenIdConnectConfigurationManager(dto);
    }

    public createOpenIdConnectLogger(level: number): OpenIdConnectLogger {
        return new OpenIdConnectLogger(level);
    }

    public createUserManager(settings: UserManagerSettings): UserManager {
        return new UserManager(settings);
    }
}
