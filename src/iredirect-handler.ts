import { UserManager } from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";

export default interface IRedirectHandler {
    (userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}
