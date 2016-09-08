"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "aurelia-framework", "./open-id-connect/index", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, index_1, aurelia_fetch_client_1) {
    "use strict";

    var Home = function () {
        function Home(openIdConnect, httpClient) {
            _classCallCheck(this, Home);

            this.openIdConnect = openIdConnect;
            this.httpClient = httpClient;
            this.isLoggedIn = false;
        }

        _createClass(Home, [{
            key: "attached",
            value: function attached() {
                var _this = this;

                this.openIdConnect.UserManager.getUser().then(function (user) {
                    _this.isLoggedIn = user !== null;
                    _this.authorizationServerMessage = JSON.stringify(user, null, 4);
                });
            }
        }, {
            key: "queryResourceServer",
            value: function queryResourceServer(serverNum, isPrivate) {
                var _this2 = this;

                this.openIdConnect.UserManager.getUser().then(function (user) {
                    var url = _this2.getUrl(serverNum, isPrivate);
                    _this2.resourceServerMessage = "Fetching " + url;
                    var fetchInit = {
                        headers: new Headers()
                    };
                    if (user !== null) {
                        fetchInit.headers.append("Authorization", "Bearer " + user.access_token);
                    }
                    _this2.httpClient.fetch(url, fetchInit).then(function (response) {
                        if (response.ok) {
                            return response.text();
                        } else {
                            return response.statusText;
                        }
                    }).then(function (data) {
                        _this2.resourceServerMessage = serverNum + ": " + data;
                    }).catch(function (err) {
                        _this2.resourceServerMessage = serverNum + ": " + err.message;
                    });
                });
            }
        }, {
            key: "getUrl",
            value: function getUrl(serverNum, isPrivate) {
                var leftPart = void 0;
                var path = void 0;
                if (window.location.hostname.startsWith("localhost")) {
                    leftPart = serverNum === 1 ? "http://localhost:5001" : "http://localhost:5002";
                } else {
                    leftPart = serverNum === 1 ? "https://zamboni-resource-01.azurewebsites.net" : "https://zamboni-resource-02.azurewebsites.net";
                }
                path = isPrivate ? "private" : "public";
                return leftPart + "/api/" + path;
            }
        }]);

        return Home;
    }();
    Home = __decorate([aurelia_framework_1.autoinject, __metadata('design:paramtypes', [index_1.OpenIdConnect, aurelia_fetch_client_1.HttpClient])], Home);
    exports.Home = Home;
});
//# sourceMappingURL=home.js.map