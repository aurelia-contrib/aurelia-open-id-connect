import { autoinject } from "aurelia-framework";
import { OpenId, User } from "./open-id/open-id";

@autoinject
export class UserBlock {

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