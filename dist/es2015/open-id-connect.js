var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { UserManager } from 'oidc-client';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import { LoginRedirectKey } from './open-id-connect-constants';
import OpenIdConnectLogger from './open-id-connect-logger';
import OpenIdConnectRouting from './open-id-connect-routing';
let OpenIdConnect = class OpenIdConnect {
    constructor(openIdConnectRouting, router, configuration, logger, userManager) {
        this.openIdConnectRouting = openIdConnectRouting;
        this.router = router;
        this.configuration = configuration;
        this.logger = logger;
        this.userManager = userManager;
    }
    configure(routerConfiguration) {
        if (typeof routerConfiguration === 'undefined' || routerConfiguration === null) {
            throw new Error('routerConfiguration parameter must not be undefined or null');
        }
        this.openIdConnectRouting.configureRouter(routerConfiguration);
    }
    login(args = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.router.currentInstruction) {
                const loginRedirectValue = this.router.currentInstruction.queryParams[LoginRedirectKey];
                if (loginRedirectValue) {
                    args.data = Object.assign({}, args.data);
                    args.data[LoginRedirectKey] = loginRedirectValue;
                }
            }
            yield this.userManager.signinRedirect(args);
        });
    }
    logout(args = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userManager.signoutRedirect(args);
            }
            catch (err) {
                if (err.message === 'no end session endpoint') {
                    this.logger.debug(err);
                    this.logger.debug('The user remains logged in at the authorization server.');
                    this.router.navigate(this.configuration.logoutRedirectRoute);
                }
                else {
                    throw err;
                }
            }
        });
    }
    loginSilent(args = {}) {
        return this.userManager.signinSilent(args);
    }
    getUser() {
        return this.userManager.getUser();
    }
    addOrRemoveHandler(key, handler) {
        if (!key.startsWith('add') && !key.startsWith('remove')) {
            let message = 'The \'addOrRemoveHandlers\' method expects a \'key\' argument ';
            message += 'that starts with either \'add\' or \'remove\'. Instead we ';
            message += 'recevied ' + key;
            throw new TypeError(message);
        }
        const addOrRemove = this.userManager.events[key];
        addOrRemove.call(this.userManager.events, handler);
    }
    observeUser(callback) {
        this.addOrRemoveHandler('addUserLoaded', () => this.getUser().then(callback));
        this.addOrRemoveHandler('addUserUnloaded', () => this.getUser().then(callback));
        return this.getUser().then(callback);
    }
};
OpenIdConnect = __decorate([
    autoinject,
    __metadata("design:paramtypes", [OpenIdConnectRouting,
        Router,
        OpenIdConnectConfigurationManager,
        OpenIdConnectLogger,
        UserManager])
], OpenIdConnect);
export default OpenIdConnect;
//# sourceMappingURL=open-id-connect.js.map