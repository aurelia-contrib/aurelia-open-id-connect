import { autoinject } from "aurelia-framework";
import { OpenIdConnect, User } from "aurelia-open-id-connect";
import { HttpClient } from "aurelia-fetch-client";

@autoinject
export class Home {

    private currentTime: number;
    private resourceServerMessage: Array<string> = new Array<string>();
    private user: User;
    private isLoggedIn: boolean = false;

    public get userJson(): string {
        return JSON.stringify(this.user, null, 4);
    }

    constructor(private openIdConnect: OpenIdConnect, private httpClient: HttpClient) {

        // update the user field wheneven it reloads
        this.openIdConnect.userManager.events.addUserLoaded(() => {
            this.setUser();
        });

        // show how much time remains until the access_token expires
        setInterval(() => {
            this.expiresIn = this.user.expires_in;
            this.currentTime = Math.round((new Date()).getTime() / 1000);
        }, 1000);
    }

    public attached() {
        this.setUser();
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

    private setUser() {
        this.openIdConnect.userManager.getUser().then((user) => {
            this.isLoggedIn = user !== null;
            this.user = user;
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
