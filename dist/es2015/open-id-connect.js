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
import { autoinject } from 'aurelia-framework';
let OpenIdConnect = class OpenIdConnect {
    constructor(openIdConnectRouting, router, configuration, logger, userManager) {
        this.openIdConnectRouting = openIdConnectRouting;
        this.router = router;
        this.configuration = configuration;
        this.logger = logger;
        this.userManager = userManager;
        this.userObservers = [];
        this.notifyUserObservers = (user) => {
            this.userObservers.forEach((o) => o.userChanged(user));
        };
        this.setupUserObservation();
    }
    configure(routerConfiguration) {
        if (typeof routerConfiguration === 'undefined' || routerConfiguration === null) {
            throw new Error('routerConfiguration parameter must not be undefined or null');
        }
        this.openIdConnectRouting.configureRouter(routerConfiguration);
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {};
            yield this.userManager.signinRedirect(args);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const args = {};
            try {
                yield this.userManager.signoutRedirect(args);
            }
            catch (err) {
                if (err.message === 'no end session endpoint') {
                    this.logger.debug(err);
                    this.logger.debug('The user remains logged in at the authorization server.');
                    this.router.navigate(this.configuration.logoutRedirectModuleId);
                }
                else {
                    throw err;
                }
            }
        });
    }
    loginSilent() {
        const args = {};
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
    observeUser(observer) {
        if (!this.userObservers.includes(observer)) {
            this.userObservers.push(observer);
        }
        this.getUser().then(this.notifyUserObservers);
    }
    setupUserObservation() {
        this.addOrRemoveHandler('addUserLoaded', () => this.getUser().then(this.notifyUserObservers));
        this.addOrRemoveHandler('addUserUnloaded', () => this.getUser().then(this.notifyUserObservers));
    }
};
OpenIdConnect = __decorate([
    autoinject
], OpenIdConnect);
export { OpenIdConnect };
