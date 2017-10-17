import OpenIdConnect from "./open-id-connect";
export default class OpenIdConnectUserDebug {
    private openIdConnect;
    private isLoggedIn;
    private user;
    readonly stringifiedUser: string;
    constructor(openIdConnect: OpenIdConnect);
    attached(): void;
}
