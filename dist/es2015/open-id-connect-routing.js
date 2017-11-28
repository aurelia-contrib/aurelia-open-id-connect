var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autoinject } from 'aurelia-framework';
import { OpenIdConnectAuthorizeStep } from './open-id-connect-authorize-step';
let OpenIdConnectRouting = class OpenIdConnectRouting {
    constructor(openIdConnectConfiguration, openIdConnectNavigationStrategies, $window, 
        // @ts-ignore
        logger) {
        this.openIdConnectConfiguration = openIdConnectConfiguration;
        this.openIdConnectNavigationStrategies = openIdConnectNavigationStrategies;
        this.$window = $window;
        this.logger = logger;
    }
    configureRouter(routerConfiguration) {
        this.addLoginRedirectRoute(routerConfiguration);
        this.addLogoutRedirectRoute(routerConfiguration);
        routerConfiguration.addPipelineStep('authorize', OpenIdConnectAuthorizeStep);
    }
    addLoginRedirectRoute(routerConfiguration) {
        routerConfiguration.mapRoute({
            name: 'logInRedirectCallback',
            navigationStrategy: (instruction) => {
                if (this.isSilentLogin()) {
                    return this.openIdConnectNavigationStrategies.silentSignInCallback(instruction);
                }
                else {
                    return this.openIdConnectNavigationStrategies.signInRedirectCallback(instruction);
                }
            },
            route: this.getPath(this.openIdConnectConfiguration.redirectUri),
        });
    }
    addLogoutRedirectRoute(routerConfiguration) {
        routerConfiguration.mapRoute({
            name: 'logOutRedirectCallback',
            navigationStrategy: (instruction) => {
                return this.openIdConnectNavigationStrategies.signOutRedirectCallback(instruction);
            },
            route: this.getPath(this.openIdConnectConfiguration.postLogoutRedirectUri),
        });
    }
    isSilentLogin() {
        try {
            return this.$window.self !== this.$window.top;
        }
        catch (e) {
            return true;
        }
    }
    getPath(uri) {
        return this.convertUriToAnchor(uri).pathname;
    }
    convertUriToAnchor(uri) {
        const anchor = document.createElement('a');
        anchor.href = uri;
        return anchor;
    }
};
OpenIdConnectRouting = __decorate([
    autoinject
], OpenIdConnectRouting);
export { OpenIdConnectRouting };
