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
var OpenIdConnect = /** @class */ (function () {
    function OpenIdConnect(openIdConnectRouting, router, configuration, logger, userManager) {
        var _this = this;
        this.openIdConnectRouting = openIdConnectRouting;
        this.router = router;
        this.configuration = configuration;
        this.logger = logger;
        this.userManager = userManager;
        this.userObservers = [];
        this.notifyUserObservers = function (user) {
            _this.userObservers.forEach(function (o) { return o.userChanged(user); });
        };
        this.setupUserObservation();
    }
    OpenIdConnect.prototype.configure = function (routerConfiguration) {
        if (typeof routerConfiguration === 'undefined' || routerConfiguration === null) {
            throw new Error('routerConfiguration parameter must not be undefined or null');
        }
        this.openIdConnectRouting.configureRouter(routerConfiguration);
    };
    OpenIdConnect.prototype.login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var args;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = {};
                        return [4 /*yield*/, this.userManager.signinRedirect(args)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OpenIdConnect.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var args, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        args = {};
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userManager.signoutRedirect(args)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1.message === 'no end session endpoint') {
                            this.logger.debug(err_1);
                            this.logger.debug('The user remains logged in at the authorization server.');
                            this.router.navigate(this.configuration.logoutRedirectModuleId);
                        }
                        else {
                            throw err_1;
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OpenIdConnect.prototype.loginSilent = function () {
        var args = {};
        return this.userManager.signinSilent(args);
    };
    OpenIdConnect.prototype.getUser = function () {
        return this.userManager.getUser();
    };
    OpenIdConnect.prototype.addOrRemoveHandler = function (key, handler) {
        if (!key.startsWith('add') && !key.startsWith('remove')) {
            var message = 'The \'addOrRemoveHandlers\' method expects a \'key\' argument ';
            message += 'that starts with either \'add\' or \'remove\'. Instead we ';
            message += 'recevied ' + key;
            throw new TypeError(message);
        }
        var addOrRemove = this.userManager.events[key];
        addOrRemove.call(this.userManager.events, handler);
    };
    OpenIdConnect.prototype.observeUser = function (observer) {
        if (!this.userObservers.includes(observer)) {
            this.userObservers.push(observer);
        }
        this.getUser().then(this.notifyUserObservers);
    };
    OpenIdConnect.prototype.setupUserObservation = function () {
        var _this = this;
        this.addOrRemoveHandler('addUserLoaded', function () { return _this.getUser().then(_this.notifyUserObservers); });
        this.addOrRemoveHandler('addUserUnloaded', function () { return _this.getUser().then(_this.notifyUserObservers); });
    };
    OpenIdConnect = __decorate([
        autoinject
    ], OpenIdConnect);
    return OpenIdConnect;
}());
export { OpenIdConnect };
