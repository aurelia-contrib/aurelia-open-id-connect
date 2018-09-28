"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_router_1 = require("aurelia-router");
var oidc_client_1 = require("oidc-client");
var open_id_connect_configuration_manager_1 = require("./open-id-connect-configuration-manager");
var open_id_connect_constants_1 = require("./open-id-connect-constants");
var open_id_connect_logger_1 = require("./open-id-connect-logger");
var open_id_connect_roles_1 = require("./open-id-connect-roles");
var OpenIdConnectAuthorizeStep = (function () {
    function OpenIdConnectAuthorizeStep(userManager, configuration, logger, $window) {
        this.userManager = userManager;
        this.configuration = configuration;
        this.logger = logger;
        this.$window = $window;
    }
    OpenIdConnectAuthorizeStep.prototype.run = function (navigationInstruction, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user, loginRedirect, loginRedirectValue, queryString, redirect;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.userManager.getUser()];
                    case 1:
                        user = _a.sent();
                        if (this.requiresRole(navigationInstruction, open_id_connect_roles_1.default.Authenticated)) {
                            if (user === null || user.expired) {
                                this.logger.debug('Requires authenticated role.');
                                loginRedirect = this.$window.location.href;
                                loginRedirectValue = encodeURIComponent(loginRedirect);
                                queryString = "?" + open_id_connect_constants_1.LoginRedirectKey + "=" + loginRedirectValue;
                                redirect = new aurelia_router_1.Redirect(this.configuration.unauthorizedRedirectRoute + queryString);
                                return [2, next.cancel(redirect)];
                            }
                        }
                        return [2, next()];
                }
            });
        });
    };
    OpenIdConnectAuthorizeStep.prototype.requiresRole = function (navigationInstruction, role) {
        var instructions = navigationInstruction.getAllInstructions();
        return instructions.some(function (instruction) {
            return instruction !== undefined &&
                instruction.config !== undefined &&
                instruction.config.settings !== undefined &&
                instruction.config.settings.roles !== undefined &&
                instruction.config.settings.roles.includes(role);
        });
    };
    OpenIdConnectAuthorizeStep = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [oidc_client_1.UserManager,
            open_id_connect_configuration_manager_1.default,
            open_id_connect_logger_1.default,
            Window])
    ], OpenIdConnectAuthorizeStep);
    return OpenIdConnectAuthorizeStep;
}());
exports.default = OpenIdConnectAuthorizeStep;
//# sourceMappingURL=open-id-connect-authorize-step.js.map