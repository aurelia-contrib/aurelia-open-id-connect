import { autoinject } from "aurelia-framework";
import { OpenIdConnect, User } from "aurelia-open-id-connect";
import { HttpClient } from "aurelia-fetch-client";

@autoinject
export class Home {

    private currentTime: number;
    private accessTokenExpiresIn: number;
    private resourceServerMessage: Array<string> = new Array<string>();
    private inMemoryUser: User;

    private get userAsJson(): string {
        return JSON.stringify(this.inMemoryUser, null, 4);
    };

    constructor(private openIdConnect: OpenIdConnect, private httpClient: HttpClient) {

        // update the user field whenever the oidc-client reloads the user
        this.openIdConnect.userManager.events.addUserLoaded(() =>
            this.openIdConnect.userManager.getUser().then((user) =>
                this.inMemoryUser = user));

        // show how much time remains until the access_token expires
        setInterval(() => {
            if (typeof this.inMemoryUser === "undefined" || this.inMemoryUser !== null) {
                return;
            }

            this.accessTokenExpiresIn = this.inMemoryUser.expires_in;
            this.currentTime = Math.round((new Date()).getTime() / 1000);
        }, 1000);
    }

    public attached() {
        this.openIdConnect.userManager.getUser().then((user) => {
            if (typeof user === "undefined" || user === null || user.expired) {
                // a successful silent login will trigger the `addUserLoaded` event
                this.openIdConnect.LoginSilent().catch((error) => {
                    // the silent login will fail if the user 
                    // is not logged in at the authorization server
                    // todo: consider calling `querySessionStatus` before calling `LoginSilent`
                    console.log(error);
                });
            } else {
                this.inMemoryUser = user;
            }
        });
    }

    public loginSilent() {
        this.openIdConnect.LoginSilent();
    }

    public queryResourceServer(serverNum: number, isPrivate: boolean) {

        this.openIdConnect.userManager.getUser().then((user: User) => {

            let url = this.getResourceServerUrl(serverNum, isPrivate);

            this.resourceServerMessage.splice(0, 0, `Fetching ${url}\n`);

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
                    this.resourceServerMessage.splice(1, 0, `${data}\n\n`);
                })
                .catch((err) => {
                    this.resourceServerMessage.splice(1, 0, `${err.message}\n\n`);
                });
        });
    }

    private getResourceServerUrl(serverNum: number, isPrivate: boolean) {

        let leftPart: string;
        let path: string;

        leftPart = serverNum === 1
            ? "http://localhost:5001"
            : "http://localhost:5002";

        path = isPrivate ? "private" : "public";

        return `${leftPart}/api/${path}`;
    }
}
