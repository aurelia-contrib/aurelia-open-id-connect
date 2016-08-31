var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id/open-id", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, open_id_1, aurelia_fetch_client_1) {
    "use strict";
    var Login = (function () {
        function Login(openId, httpClient) {
            var _this = this;
            this.openId = openId;
            this.httpClient = httpClient;
            this.isLoggedIn = false;
            this.openId.UserManager.getUser().then(function (user) {
                console.log(user);
                if (user === null || user === undefined) {
                    return;
                }
                console.log("logged in");
                _this.isLoggedIn = true;
                _this.authorizationServerMessage = JSON.stringify(user, null, 4);
                console.log("login constructor done");
            });
        }
        Login.prototype.login = function () {
            this.openId.Login();
        };
        Login.prototype.logout = function () {
            this.openId.Logout();
        };
        Login.prototype.queryResourceServer = function (serverNum, isPrivate) {
            var _this = this;
            this.openId.UserManager.getUser().then(function (user) {
                var url = _this.getUrl(serverNum, isPrivate);
                _this.resourceServerMessage = "Fetching " + url;
                var fetchInit = {
                    headers: new Headers(),
                };
                if (user !== null && user !== undefined) {
                    fetchInit.headers.append("Authorization", "Bearer " + user.access_token);
                }
                _this.httpClient.fetch(url, fetchInit)
                    .then(function (response) {
                    if (response.ok) {
                        return response.text();
                    }
                    else {
                        return response.statusText;
                    }
                })
                    .then(function (data) {
                    _this.resourceServerMessage = serverNum + ": " + data;
                })
                    .catch(function (err) {
                    _this.resourceServerMessage = serverNum + ": " + err.message;
                });
            });
        };
        Login.prototype.getUrl = function (serverNum, isPrivate) {
            var leftPart;
            var path;
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
            return leftPart + "/api/" + path;
        };
        Login = __decorate([
            aurelia_framework_1.autoinject, 
            __metadata('design:paramtypes', [open_id_1.OpenId, aurelia_fetch_client_1.HttpClient])
        ], Login);
        return Login;
    }());
    exports.Login = Login;
});
//# sourceMappingURL=login.js.map