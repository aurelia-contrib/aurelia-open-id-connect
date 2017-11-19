import { autoinject, customElement } from "aurelia-framework";
import { User } from "oidc-client";
import OpenIdConnect from "./open-id-connect";

@autoinject
@customElement("open-id-connect-user-block")
export default class OpenIdConnectUserBlock {

    protected isLoggedIn: boolean = false;
    private user: User = null;

    public get stringifiedUser(): string {
        return JSON.stringify(this.user, undefined, 2);
    }

    constructor(private openIdConnect: OpenIdConnect) { }

    public async attached() {
        this.user = await this.openIdConnect.userManager.getUser();
        this.isLoggedIn = this.user !== null;
    }

    public login() {
        this.openIdConnect.login();
    }

    public logout() {
        this.openIdConnect.logout();
    }
}
