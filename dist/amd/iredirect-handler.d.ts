import { UserManager } from "oidc-client";
import { OpenIdConnectLogger } from "./index-internal";
export default interface IRedirectHandler {
    (userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}
