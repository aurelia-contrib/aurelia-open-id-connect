var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id-connect/index", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, index_1, aurelia_fetch_client_1) {
    "use strict";
    let Home = class Home {
        constructor(openIdConnect, httpClient) {
            this.openIdConnect = openIdConnect;
            this.httpClient = httpClient;
            this.isLoggedIn = false;
        }
        attached() {
            this.openIdConnect.UserManager.getUser().then((user) => {
                this.isLoggedIn = user !== null;
                this.authorizationServerMessage = JSON.stringify(user, null, 4);
            });
        }
        queryResourceServer(serverNum, isPrivate) {
            this.openIdConnect.UserManager.getUser().then((user) => {
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
                    }
                    else {
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
        getUrl(serverNum, isPrivate) {
            let leftPart;
            let path;
            if (window.location.hostname.startsWith("localhost")) {
                leftPart = serverNum === 1
                    ? "http://localhost:5001"
                    : "http://localhost:5002";
            }
            else {
                leftPart = serverNum === 1
                    ? "https://zamboni-resource-01.azurewebsites.net"
                    : "https://zamboni-resource-02.azurewebsites.net";
            }
            path = isPrivate ? "private" : "public";
            return `${leftPart}/api/${path}`;
        }
    };
    Home = __decorate([
        aurelia_framework_1.autoinject, 
        __metadata('design:paramtypes', [index_1.OpenIdConnect, aurelia_fetch_client_1.HttpClient])
    ], Home);
    exports.Home = Home;
});
//# sourceMappingURL=home.js.map