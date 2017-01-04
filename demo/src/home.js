var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "aurelia-open-id-connect", "aurelia-fetch-client", "./environment"], function (require, exports, aurelia_framework_1, aurelia_open_id_connect_1, aurelia_fetch_client_1, environment_1) {
    "use strict";
    var Home = (function () {
        function Home(openIdConnect, httpClient) {
            this.openIdConnect = openIdConnect;
            this.httpClient = httpClient;
            this.resourceServerMessage = new Array();
            this.setInMemoryUserOnUserLoadedEvent();
            this.setTimeUntilAccessTokenExpiry();
        }
        Object.defineProperty(Home.prototype, "environmentAsJson", {
            get: function () {
                return JSON.stringify(environment_1.default, null, 4);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Home.prototype, "userAsJson", {
            get: function () {
                return JSON.stringify(this.inMemoryUser, null, 4);
            },
            enumerable: true,
            configurable: true
        });
        ;
        Home.prototype.attached = function () {
            var _this = this;
            this.openIdConnect.userManager.getUser()
                .then(function (user) {
                if (typeof user === "undefined" || user === null) {
                    return;
                }
                else {
                    if (user.expired) {
                        _this.loginSilent();
                    }
                    else {
                        _this.inMemoryUser = user;
                    }
                }
            });
        };
        Home.prototype.queryResourceServer = function (serverNum, isPrivate) {
            var _this = this;
            var fetchUrl = this.getResourceServerUrl(serverNum, isPrivate);
            var fetchInit = this.getFetchInit();
            this.resourceServerMessage.splice(0, 0, "Fetching " + fetchUrl + "\n");
            this.resourceServerMessage.splice(1, 0, "\n");
            this.httpClient.fetch(fetchUrl, fetchInit)
                .then(function (response) { return response.ok ? response.text() : response.statusText; })
                .then(function (data) { return _this.resourceServerMessage.splice(1, 0, data + "\n"); })
                .catch(function (err) { return _this.resourceServerMessage.splice(1, 0, err.message + "\n"); });
        };
        Home.prototype.loginSilent = function () {
            this.openIdConnect.loginSilent().catch(function (error) {
                console.log(error);
            });
        };
        Home.prototype.setInMemoryUserOnUserLoadedEvent = function () {
            var _this = this;
            this.openIdConnect.userManager.events.addUserLoaded(function () {
                return _this.openIdConnect.userManager.getUser().then(function (user) {
                    return _this.inMemoryUser = user;
                });
            });
        };
        Home.prototype.setTimeUntilAccessTokenExpiry = function () {
            var _this = this;
            setInterval(function () {
                _this.currentTime = Math.round((new Date()).getTime() / 1000);
                if (typeof _this.inMemoryUser !== "undefined" && _this.inMemoryUser !== null) {
                    _this.accessTokenExpiresIn = _this.inMemoryUser.expires_in;
                }
            }, 1000);
        };
        Home.prototype.getFetchInit = function () {
            var fetchInit = {
                headers: new Headers()
            };
            if (this.inMemoryUser != null) {
                fetchInit.headers
                    .append("Authorization", "Bearer " + this.inMemoryUser.access_token);
            }
            return fetchInit;
        };
        Home.prototype.getResourceServerUrl = function (serverNum, isPrivate) {
            var leftPart = serverNum === 1
                ? environment_1.default.urls.resourceServer01
                : environment_1.default.urls.resourceServer02;
            var path = isPrivate ? "private" : "public";
            return leftPart + "/api/" + path;
        };
        return Home;
    }());
    Home = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_open_id_connect_1.OpenIdConnect, aurelia_fetch_client_1.HttpClient])
    ], Home);
    exports.Home = Home;
});
//# sourceMappingURL=home.js.map