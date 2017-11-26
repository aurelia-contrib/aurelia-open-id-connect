import { User } from "oidc-client";
import OpenIdConnect from "./open-id-connect";
export default class  {
    protected openIdConnect: OpenIdConnect;
    protected user: User;
    readonly isLoggedIn: boolean;
    constructor(openIdConnect: OpenIdConnect);
    attached(): Promise<void>;
    login(): void;
    logout(): void;
}
