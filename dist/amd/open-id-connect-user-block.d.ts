import OpenIdConnect from "./open-id-connect";
export default class OpenIdConnectUserBlock {
    private openIdConnect;
    private isLoggedIn;
    private user;
    constructor(openIdConnect: OpenIdConnect);
    attached(): void;
    login(): void;
    logout(): void;
}
