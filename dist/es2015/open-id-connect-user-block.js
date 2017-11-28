var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { autoinject, customElement } from 'aurelia-framework';
let OpenIdConnectUserBlock = class OpenIdConnectUserBlock {
    constructor(openIdConnect) {
        this.openIdConnect = openIdConnect;
        this.user = null;
    }
    get isLoggedIn() {
        return this.user !== null && this.user !== undefined;
    }
    attached() {
        return __awaiter(this, void 0, void 0, function* () {
            this.openIdConnect.addOrRemoveHandler('addUserUnloaded', () => {
                this.user = null;
            });
            this.openIdConnect.addOrRemoveHandler('addUserLoaded', () => __awaiter(this, void 0, void 0, function* () {
                this.user = yield this.openIdConnect.getUser();
            }));
            this.user = yield this.openIdConnect.getUser();
        });
    }
    login() {
        this.openIdConnect.login();
    }
    logout() {
        this.openIdConnect.logout();
    }
};
OpenIdConnectUserBlock = __decorate([
    autoinject,
    customElement('open-id-connect-user-block')
], OpenIdConnectUserBlock);
export { OpenIdConnectUserBlock };
