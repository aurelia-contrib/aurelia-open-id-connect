import { autoinject } from "aurelia-framework";
import { OpenId, User } from "./open-id/open-id";
import { HttpClient } from "aurelia-fetch-client";

@autoinject
export class Home {

    private authorizationServerMessage: string;
    private resourceServerMessage: string;
    private isLoggedIn: boolean = false;

    constructor(private openId: OpenId, private httpClient: HttpClient) { }

    attached() {
        this.openId.UserManager.getUser().then((user: User) => {
            this.isLoggedIn = user !== null;
            this.authorizationServerMessage = JSON.stringify(user, null, 4);
        });
    }

    private queryResourceServer(serverNum: number, isPrivate: boolean) {

        this.openId.UserManager.getUser().then((user: User) => {

            let url = this.getUrl(serverNum, isPrivate);

            this.resourceServerMessage = `Fetching ${url}`;

            let fetchInit = {
                headers: new Headers(),
            };

            if (user !== null) {
                fetchInit.headers.append("Authorization", `Bearer ${user.access_token}`);
            }

            this.httpClient.fetch(url, fetchInit)
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        return response.statusText;
                    }
                })
                .then((data) => {
                    this.resourceServerMessage = `${serverNum}: ${data}`;
                })
                .catch((err) => {
                    this.resourceServerMessage = `${serverNum}: ${err.message}`;
                });
        });
    }

    // HACK: Handle different environments and servers
    private getUrl(serverNum: number, isPrivate: boolean) {
        let leftPart: string;
        let path: string;

        if (window.location.hostname.startsWith("localhost")) {
            leftPart = serverNum === 1
                ? "http://localhost:5001"
                : "http://localhost:5002";
        } else {
            leftPart = serverNum === 1
                ? "https://zamboni-resource-01.azurewebsites.net"
                : "https://zamboni-resource-02.azurewebsites.net";
        }

        path = isPrivate ? "private" : "public";

        return `${leftPart}/api/${path}`;
    }
}
