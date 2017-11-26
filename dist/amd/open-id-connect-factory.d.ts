import { UserManager, UserManagerSettings } from "oidc-client";
import { OpenIdConnectConfigurationDto } from ".";
import { OpenIdConnectConfiguration, OpenIdConnectLogger } from "./index-internal";
export default class  {
    createOpenIdConnectConfiguration(dto: OpenIdConnectConfigurationDto): OpenIdConnectConfiguration;
    createOpenIdConnectLogger(level: number): OpenIdConnectLogger;
    createUserManager(settings: UserManagerSettings): UserManager;
}
