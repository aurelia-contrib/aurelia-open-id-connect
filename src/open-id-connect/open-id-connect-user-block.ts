import { autoinject } from "aurelia-framework";
import { User } from "oidc-client";
import { OpenIdConnect } from "./open-id-connect";

@autoinject
export class OpenIdConnectUserBlock {

    private isLoggedIn: boolean = false;
    private user: User = null;

    constructor(private openIdConnect: OpenIdConnect) { }

    public attached() {
        this.openIdConnect.UserManager.getUser().then((user: User) => {
            this.user = user;
            this.isLoggedIn = user !== null;
        });
    }
}