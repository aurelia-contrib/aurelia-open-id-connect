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
define(["require", "exports", "aurelia-router", "chai", "oidc-client", "sinon", "../src", "../src/index-internal"], function (require, exports, aurelia_router_1, chai_1, oidc_client_1, sinon, src_1, index_internal_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('open-id-connect', function () {
        var openIdConnectRouting = sinon.createStubInstance(index_internal_1.OpenIdConnectRouting);
        var logger = sinon.createStubInstance(index_internal_1.OpenIdConnectLogger);
        var userManager = sinon.createStubInstance(oidc_client_1.UserManager);
        var router = sinon.createStubInstance(aurelia_router_1.Router);
        var configurationManager = sinon.createStubInstance(index_internal_1.OpenIdConnectConfigurationManager);
        var events = {
            addUserLoaded: sinon.spy(),
            addUserUnloaded: sinon.spy(),
        };
        sinon.stub(userManager, 'events').get(function () { return events; });
        var openIdConnect = new src_1.OpenIdConnect(openIdConnectRouting, router, configurationManager, logger, userManager);
        context('configure', function () {
            it('should throw when routerConfiguration is undefined', function () {
                chai_1.assert.throws(function () { return openIdConnect.configure(undefined); });
            });
            it('should throw when routerConfiguration is null', function () {
                chai_1.assert.throws(function () { return openIdConnect.configure(null); });
            });
            it('should flow routerConfiguration to this.openIdConnectRouting.configureRouter', function () {
                var routerConfiguration = new aurelia_router_1.RouterConfiguration();
                openIdConnect.configure(routerConfiguration);
                sinon.assert.calledWith(openIdConnectRouting.configureRouter, routerConfiguration);
            });
        });
        context('login', function () {
            it('should call this.userManager.signinRedirect', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, openIdConnect.login()];
                        case 1:
                            _a.sent();
                            sinon.assert.calledOnce(userManager.signinRedirect);
                            return [2];
                    }
                });
            }); });
        });
        context('logout', function () {
            it('should call this.userManager.signoutRedirect', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, openIdConnect.logout()];
                        case 1:
                            _a.sent();
                            sinon.assert.calledOnce(userManager.signoutRedirect);
                            return [2];
                    }
                });
            }); });
        });
        context('loginSilent', function () {
            it('should return result of this.userManager.signinSilent', function () { return __awaiter(_this, void 0, void 0, function () {
                var expected, actual, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            expected = Promise.resolve({ id_token: 'id_token' });
                            userManager.signinSilent.returns(expected);
                            actual = openIdConnect.loginSilent();
                            _b = (_a = chai_1.assert).equal;
                            return [4, actual];
                        case 1:
                            _c = [_d.sent()];
                            return [4, expected];
                        case 2:
                            _b.apply(_a, _c.concat([_d.sent()]));
                            return [2];
                    }
                });
            }); });
        });
        context('getUser', function () {
            it('should return result of this.userManager.getUser', function () { return __awaiter(_this, void 0, void 0, function () {
                var expected, actual, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            expected = Promise.resolve({ id_token: 'id_token' });
                            userManager.getUser.returns(expected);
                            actual = openIdConnect.getUser();
                            _b = (_a = chai_1.assert).equal;
                            return [4, actual];
                        case 1:
                            _c = [_d.sent()];
                            return [4, expected];
                        case 2:
                            _b.apply(_a, _c.concat([_d.sent()]));
                            return [2];
                    }
                });
            }); });
        });
        context('handlers', function () {
            it('should invoke method on underlying events object', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    openIdConnect.addOrRemoveHandler('addUserLoaded', function () { return undefined; });
                    sinon.assert.calledOn(events.addUserLoaded, events);
                    return [2];
                });
            }); });
            it('should throw when the key does not start with add/remove', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    chai_1.assert.throws(function () { return openIdConnect.addOrRemoveHandler('load', function () { return undefined; }); });
                    return [2];
                });
            }); });
        });
    });
});
//# sourceMappingURL=open-id-connect.spec.js.map