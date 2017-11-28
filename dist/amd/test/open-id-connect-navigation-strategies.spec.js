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
define(["require", "exports", "aurelia-router", "chai", "oidc-client", "sinon", "../src/index-internal"], function (require, exports, aurelia_router_1, chai_1, oidc_client_1, sinon, index_internal_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('open-id-connect-navigation-strategies', function () {
        var logger = sinon.createStubInstance(index_internal_1.OpenIdConnectLogger);
        var configuration = sinon.createStubInstance(index_internal_1.OpenIdConnectConfigurationManager);
        var userManager = sinon.createStubInstance(oidc_client_1.UserManager);
        var instruction = sinon.createStubInstance(aurelia_router_1.NavigationInstruction);
        var loginRedirectModuleId = 'login';
        sinon.stub(configuration, 'loginRedirectModuleId').get(function () { return loginRedirectModuleId; });
        var logoutRedirectModuleId = 'logout';
        sinon.stub(configuration, 'logoutRedirectModuleId').get(function () { return logoutRedirectModuleId; });
        instruction.config = { moduleId: '' };
        var strategies = new index_internal_1.OpenIdConnectNavigationStrategies(logger, configuration, userManager);
        [
            {
                method: 'signInRedirectCallback',
                delegatesTo: 'signinRedirectCallback',
                redirectsTo: loginRedirectModuleId,
            },
            {
                method: 'signOutRedirectCallback',
                delegatesTo: 'signoutRedirectCallback',
                redirectsTo: logoutRedirectModuleId,
            },
            {
                method: 'silentSignInCallback',
                delegatesTo: 'signinSilentCallback',
                redirectsTo: loginRedirectModuleId,
            },
        ].forEach(function (o) {
            context(o.method, function () {
                it("should forward call to userManager > " + o.delegatesTo, function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, strategies[o.method](instruction)];
                            case 1:
                                _a.sent();
                                sinon.assert.calledOnce(userManager[o.delegatesTo]);
                                return [2];
                        }
                    });
                }); });
                it("should redirect to " + o.redirectsTo + " on success", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, strategies[o.method](instruction)];
                            case 1:
                                _a.sent();
                                chai_1.assert.equal(instruction.config.redirect, o.redirectsTo);
                                return [2];
                        }
                    });
                }); });
                it("should redirect to " + o.redirectsTo + " on error", function () { return __awaiter(_this, void 0, void 0, function () {
                    var stub, threwError, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                stub = userManager[o.delegatesTo];
                                stub.throwsException();
                                threwError = false;
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, 4, 5]);
                                return [4, strategies[o.method](instruction)];
                            case 2:
                                _a.sent();
                                return [3, 5];
                            case 3:
                                err_1 = _a.sent();
                                threwError = true;
                                return [3, 5];
                            case 4:
                                chai_1.assert.isTrue(threwError);
                                chai_1.assert.equal(instruction.config.redirect, o.redirectsTo);
                                return [7];
                            case 5: return [2];
                        }
                    });
                }); });
            });
        });
    });
});
//# sourceMappingURL=open-id-connect-navigation-strategies.spec.js.map