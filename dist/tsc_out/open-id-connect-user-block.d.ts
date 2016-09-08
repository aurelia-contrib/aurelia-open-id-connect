import { OpenIdConnect } from "./open-id-connect";
export declare class OpenIdConnectUserBlock {
    private openIdConnect;
    private isLoggedIn;
    private user;
    constructor(openIdConnect: OpenIdConnect);
    attached(): void;
}
