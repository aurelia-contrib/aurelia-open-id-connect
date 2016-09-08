import { autoinject } from "aurelia-framework";
import { OpenId, User } from "open-id";

@autoinject
export class OpenIdUserBlock {

    private isLoggedIn: boolean = false;
    private user: User = null;

    constructor(private openId: OpenId) { }

    attached() {
        this.openId.UserManager.getUser().then((user: User) => {
            this.user = user;
            this.isLoggedIn = user !== null;
        });
    }
}