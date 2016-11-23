import { FrameworkConfiguration } from "aurelia-framework";
import OpenIdConnectLogger from "./open-id-connect-logger";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectAuthorizationStep from "./open-id-connect-authorize-step";
import OpenIdConnect from "./open-id-connect";
import OpenIdConnectRouting from "./open-id-connect-routing";
import OpenIdConnectRoles from "./open-id-connect-roles";
declare function configure(config: FrameworkConfiguration, callback: Function): void;
export { configure, OpenIdConnect, OpenIdConnectRoles, OpenIdConnectRouting, OpenIdConnectConfiguration, OpenIdConnectLogger, OpenIdConnectAuthorizationStep };
