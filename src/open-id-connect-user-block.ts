import { autoinject, customElement } from "aurelia-framework";
import { User } from "oidc-client";
import { OpenIdConnect } from ".";

@autoinject
@customElement("open-id-connect-user-block")
export default class {

    protected user: User = null;

    public get isLoggedIn(): boolean {
        return this.user !== null && this.user !== undefined;
    }

    constructor(protected openIdConnect: OpenIdConnect) { }

    public async attached() {
        this.openIdConnect.addOrRemoveHandler("addUserUnloaded", () => {
            this.user = null;
        });

        this.openIdConnect.addOrRemoveHandler("addUserLoaded", async () => {
            this.user = await this.openIdConnect.getUser();
        });

        this.user = await this.openIdConnect.getUser();
    }

    public login() {
        this.openIdConnect.login();
    }

    public logout() {
        this.openIdConnect.logout();
    }
}
