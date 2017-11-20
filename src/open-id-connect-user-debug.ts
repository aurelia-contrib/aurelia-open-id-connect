import { autoinject, customElement } from "aurelia-framework";
import { User } from "oidc-client";
import OpenIdConnect from "./open-id-connect";

@autoinject
@customElement("open-id-connect-user-debug")
export default class OpenIdConnectUserDebug {

    private user: User = null;

    public get isLoggedIn(): boolean {
        return this.user !== null && this.user !== undefined;
    }

    public get stringifiedUser(): string {
        return JSON.stringify(this.user, undefined, 2);
    }

    constructor(private openIdConnect: OpenIdConnect) { }

    public async attached() {
        this.user = await this.openIdConnect.getUser();
    }
}
