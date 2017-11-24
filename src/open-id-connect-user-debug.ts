import { autoinject, customElement } from "aurelia-framework";
import OpenIdConnectUserBlock from "./open-id-connect-user-block";

@autoinject
@customElement("open-id-connect-user-debug")
export default class extends OpenIdConnectUserBlock {

    public get stringifiedUser(): string {
        return JSON.stringify(this.user, undefined, 2);
    }
}
