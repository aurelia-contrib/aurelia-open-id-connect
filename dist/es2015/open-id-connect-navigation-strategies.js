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
import { UserManager } from 'oidc-client';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectLogger from './open-id-connect-logger';
let OpenIdConnectNavigationStrategies = class OpenIdConnectNavigationStrategies {
    constructor(logger, openIdConnectConfiguration, userManager, $window) {
        this.logger = logger;
        this.openIdConnectConfiguration = openIdConnectConfiguration;
        this.userManager = userManager;
        this.$window = $window;
    }
    signInRedirectCallback(instruction) {
        return __awaiter(this, void 0, void 0, function* () {
            const callbackHandler = () => __awaiter(this, void 0, void 0, function* () {
                const args = {};
                return this.userManager.signinRedirectCallback(args);
            });
            const navigationInstruction = () => {
                this.$window.location.assign(this.openIdConnectConfiguration.loginRedirectRoute);
            };
            return this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
        });
    }
    silentSignInCallback(instruction) {
        const callbackHandler = () => __awaiter(this, void 0, void 0, function* () {
            return this.userManager.signinSilentCallback();
        });
        const navigationInstruction = () => {
            instruction.config.redirect =
                this.openIdConnectConfiguration.loginRedirectRoute;
        };
        return this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
    }
    signOutRedirectCallback(instruction) {
        const callbackHandler = () => __awaiter(this, void 0, void 0, function* () {
            const args = {};
            return this.userManager.signoutRedirectCallback(args);
        });
        const navigationInstruction = () => {
            this.$window.location.assign(this.openIdConnectConfiguration.logoutRedirectRoute);
        };
        return this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
    }
    runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.logger.debug('Handling the response from the Identity Provider');
                yield callbackHandler();
                this.logger.debug('Redirecting on authorization success');
                navigationInstruction();
            }
            catch (err) {
                this.logger.debug('Redirecting on authorization error');
                navigationInstruction();
                throw err;
            }
        });
    }
};
OpenIdConnectNavigationStrategies = __decorate([
    autoinject,
    __metadata("design:paramtypes", [OpenIdConnectLogger,
        OpenIdConnectConfigurationManager,
        UserManager,
        Window])
], OpenIdConnectNavigationStrategies);
export default OpenIdConnectNavigationStrategies;
//# sourceMappingURL=open-id-connect-navigation-strategies.js.map