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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { autoinject } from 'aurelia-framework';
// TODO: Move some of the route-definition logic from
// the open-id-connect-routing.ts file into this file instead.
// The current file, for instance, could define the
// { name, navigationStrategy, route } object instead of defining only
// the navigationStrategy implementation.
var OpenIdConnectNavigationStrategies = /** @class */ (function () {
    function OpenIdConnectNavigationStrategies(
        // @ts-ignore
        logger, openIdConnectConfiguration, userManager) {
        this.logger = logger;
        this.openIdConnectConfiguration = openIdConnectConfiguration;
        this.userManager = userManager;
    }
    OpenIdConnectNavigationStrategies.prototype.signInRedirectCallback = function (instruction) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var callbackHandler, navigationInstruction;
            return __generator(this, function (_a) {
                callbackHandler = function () { return __awaiter(_this, void 0, void 0, function () {
                    var args;
                    return __generator(this, function (_a) {
                        args = {};
                        return [2 /*return*/, this.userManager.signinRedirectCallback(args)];
                    });
                }); };
                navigationInstruction = function () {
                    instruction.config.redirect =
                        _this.openIdConnectConfiguration.loginRedirectModuleId;
                };
                return [2 /*return*/, this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction)];
            });
        });
    };
    OpenIdConnectNavigationStrategies.prototype.silentSignInCallback = function (instruction) {
        var _this = this;
        var callbackHandler = function () { return __awaiter(_this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                url = undefined;
                return [2 /*return*/, this.userManager.signinSilentCallback(url)];
            });
        }); };
        var navigationInstruction = function () {
            // This happens in a child iframe.
            instruction.config.redirect =
                _this.openIdConnectConfiguration.loginRedirectModuleId;
        };
        return this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
    };
    OpenIdConnectNavigationStrategies.prototype.signOutRedirectCallback = function (instruction) {
        var _this = this;
        var callbackHandler = function () { return __awaiter(_this, void 0, void 0, function () {
            var args;
            return __generator(this, function (_a) {
                args = {};
                return [2 /*return*/, this.userManager.signoutRedirectCallback(args)];
            });
        }); };
        var navigationInstruction = function () {
            instruction.config.redirect =
                _this.openIdConnectConfiguration.logoutRedirectModuleId;
        };
        return this.runHandlerAndCompleteNavigationInstruction(callbackHandler, navigationInstruction);
    };
    OpenIdConnectNavigationStrategies.prototype.runHandlerAndCompleteNavigationInstruction = function (callbackHandler, navigationInstruction) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        this.logger.debug('Handling the response from the Identity Provider');
                        return [4 /*yield*/, callbackHandler()];
                    case 1:
                        _a.sent();
                        this.logger.debug('Redirecting on authorization success');
                        navigationInstruction();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.logger.debug('Redirecting on authorization error');
                        navigationInstruction();
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OpenIdConnectNavigationStrategies = __decorate([
        autoinject
    ], OpenIdConnectNavigationStrategies);
    return OpenIdConnectNavigationStrategies;
}());
export { OpenIdConnectNavigationStrategies };
