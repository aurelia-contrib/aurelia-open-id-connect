import { User } from "oidc-client";
import OpenIdConnect from "./open-id-connect";
export default class  {
    private openIdConnect;
    protected user: User;
    readonly isLoggedIn: boolean;
    constructor(openIdConnect: OpenIdConnect);
    attached(): Promise<void>;
    login(): void;
    logout(): void;
    protected loginSilent(): Promise<void>;
}
