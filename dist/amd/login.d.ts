import { OpenId } from "./open-id/open-id";
import { HttpClient } from "aurelia-fetch-client";
export declare class Login {
    private openId;
    private httpClient;
    private authorizationServerMessage;
    private resourceServerMessage;
    private isLoggedIn;
    constructor(openId: OpenId, httpClient: HttpClient);
    private login();
    private logout();
    private queryResourceServer(serverNum, isPrivate);
    private getUrl(serverNum, isPrivate);
}
