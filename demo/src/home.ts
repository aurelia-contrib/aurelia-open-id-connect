import { autoinject } from "aurelia-framework";
import { OpenIdConnect, User } from "aurelia-open-id-connect";
import { HttpClient } from "aurelia-fetch-client";

@autoinject
export class Home {

    private authorizationServerMessage: string;
    private currentTime: number;
    private resourceServerMessage: string;
    private isLoggedIn: boolean = false;

    constructor(private openIdConnect: OpenIdConnect, private httpClient: HttpClient) {
        this.openIdConnect.userManager.events.addUserLoaded(() => {
            this.displayUserInfo();
        });

        setInterval(() => {
            this.currentTime = Math.round((new Date()).getTime() / 1000);
        }, 1000);
    }

    public attached() {
        this.displayUserInfo();
    }

    public loginSilent() {
        this.openIdConnect.LoginSilent();
    }

    public queryResourceServer(serverNum: number, isPrivate: boolean) {

        this.openIdConnect.userManager.getUser().then((user: User) => {

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

    private displayUserInfo() {
        this.openIdConnect.userManager.getUser().then((user) => {
            this.isLoggedIn = user !== null;
            this.authorizationServerMessage = JSON.stringify(user, null, 4);
        });
    }

    private getUrl(serverNum: number, isPrivate: boolean) {

        let leftPart: string;
        let path: string;

        leftPart = serverNum === 1
            ? "http://localhost:5001"
            : "http://localhost:5002";

        path = isPrivate ? "private" : "public";

        return `${leftPart}/api/${path}`;
    }
}
