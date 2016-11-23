
// export * from "./open-id-connect-authorize-step";
// export * from "./open-id-connect-routing";
// export * from "./open-id-connect-logger";

// by convention, we must call this `configure`
import configure from "./plugin";
import OpenIdConnect from "./open-id-connect";
import OpenIdConnectRoles from "./open-id-connect-roles";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";

export {
    configure,
    OpenIdConnect,
    OpenIdConnectRoles,
    OpenIdConnectConfiguration
}
