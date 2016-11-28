/// <reference types="core-js" />
import { UserManager } from "oidc-client";
import OpenIdConnectLogger from "./open-id-connect-logger";
interface IRedirectHandler {
    (userManager: UserManager, logger: OpenIdConnectLogger): Promise<any>;
}
export default IRedirectHandler;
