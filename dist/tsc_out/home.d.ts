import { OpenIdConnect } from "./open-id-connect/index";
import { HttpClient } from "aurelia-fetch-client";
export declare class Home {
    private openIdConnect;
    private httpClient;
    private authorizationServerMessage;
    private resourceServerMessage;
    private isLoggedIn;
    constructor(openIdConnect: OpenIdConnect, httpClient: HttpClient);
    attached(): void;
    queryResourceServer(serverNum: number, isPrivate: boolean): void;
    private getUrl(serverNum, isPrivate);
}
