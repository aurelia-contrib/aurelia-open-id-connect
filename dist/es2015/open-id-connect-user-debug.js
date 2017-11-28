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
import { OpenIdConnectUserBlock } from './open-id-connect-user-block';
let OpenIdConnectUserDebug = class OpenIdConnectUserDebug extends OpenIdConnectUserBlock {
    loginSilent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.openIdConnect.loginSilent();
            }
            catch (err) {
                if (err.error !== 'login_required') {
                    // TODO: Check the JavaScript specification on Error and check
                    // the OpenID Connect specification for the nesting of an error
                    // inside the err object.
                    throw err;
                }
                this.login();
            }
        });
    }
    get stringifiedUser() {
        return JSON.stringify(this.user, undefined, 2);
    }
};
OpenIdConnectUserDebug = __decorate([
    autoinject,
    customElement('open-id-connect-user-debug')
], OpenIdConnectUserDebug);
export { OpenIdConnectUserDebug };
