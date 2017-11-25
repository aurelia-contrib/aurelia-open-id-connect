import OpenIdConnect from "./open-id-connect";
import OpenIdConnectConfigurationDto from "./open-id-connect-configuration-dto";
import OpenIdConnectRoles from "./open-id-connect-roles";
// by convention, the plugin is named `configure`
import configure from "./plugin";

export {
    configure,
    OpenIdConnect,
    OpenIdConnectRoles,
    OpenIdConnectConfigurationDto,
};
