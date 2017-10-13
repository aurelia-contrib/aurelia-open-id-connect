import { autoinject, customElement } from "aurelia-framework";
import { User } from "oidc-client";
import OpenIdConnect from "./open-id-connect";

@autoinject
@customElement("open-id-connect-user-block")
export default class OpenIdConnectUserBlock {

    private isLoggedIn: boolean = false;
    private user: User = null;

    constructor(private openIdConnect: OpenIdConnect) { }

    public attached() {
        this.openIdConnect.userManager.getUser().then((user: User) => {
            this.user = user;
            this.isLoggedIn = user !== null;
        });
    }

    public login() {
        this.openIdConnect.login();
    }

    public logout() {
        this.openIdConnect.logout();
    }
}
