var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { autoinject } from 'aurelia-framework';
import OpenIdConnectAuthorizeStep from './open-id-connect-authorize-step';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectLogger from './open-id-connect-logger';
import OpenIdConnectNavigationStrategies from './open-id-connect-navigation-strategies';
let OpenIdConnectRouting = class OpenIdConnectRouting {
    constructor(openIdConnectConfiguration, openIdConnectNavigationStrategies, $window, logger) {
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
            route: this.getPath(this.openIdConnectConfiguration.redirectUri)
                .replace(routerConfiguration.options.root || '/', '/'),
        });
    }
    addLogoutRedirectRoute(routerConfiguration) {
        routerConfiguration.mapRoute({
            name: 'logOutRedirectCallback',
            navigationStrategy: (instruction) => {
                return this.openIdConnectNavigationStrategies.signOutRedirectCallback(instruction);
            },
            route: this.getPath(this.openIdConnectConfiguration.postLogoutRedirectUri)
                .replace(routerConfiguration.options.root || '/', '/'),
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
    autoinject,
    __metadata("design:paramtypes", [OpenIdConnectConfigurationManager,
        OpenIdConnectNavigationStrategies,
        Window,
        OpenIdConnectLogger])
], OpenIdConnectRouting);
export default OpenIdConnectRouting;
//# sourceMappingURL=open-id-connect-routing.js.map