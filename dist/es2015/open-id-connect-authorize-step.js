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
import { Redirect, } from 'aurelia-router';
import { OpenIdConnectRoles } from './open-id-connect-roles';
let OpenIdConnectAuthorizeStep = class OpenIdConnectAuthorizeStep {
    constructor(userManager, configuration, logger) {
        this.userManager = userManager;
        this.configuration = configuration;
        this.logger = logger;
    }
    run(navigationInstruction, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userManager.getUser();
            // TODO: Make this open for extension,
            // so that user-land can configure multiple, arbitrary roles.
            if (this.requiresRole(navigationInstruction, OpenIdConnectRoles.Authenticated)) {
                if (user === null) {
                    this.logger.debug('Requires authenticated role.');
                    const redirect = new Redirect(this.configuration.unauthorizedRedirectModuleId);
                    return next.cancel(redirect);
                }
            }
            return next();
        });
    }
    requiresRole(navigationInstruction, role) {
        const instructions = navigationInstruction.getAllInstructions();
        return instructions.some((instruction) => instruction !== undefined &&
            instruction.config !== undefined &&
            instruction.config.settings !== undefined &&
            instruction.config.settings.roles !== undefined &&
            instruction.config.settings.roles.includes(role));
    }
};
OpenIdConnectAuthorizeStep = __decorate([
    autoinject
], OpenIdConnectAuthorizeStep);
export { OpenIdConnectAuthorizeStep };
