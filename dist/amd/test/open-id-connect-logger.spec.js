define(["require", "exports", "chai", "oidc-client", "sinon", "../src/index-internal"], function (require, exports, chai_1, oidc_client_1, sinon, index_internal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assertLoggerAction = function (logLevel, loggerName, spy) {
        var logger = new index_internal_1.OpenIdConnectLogger(logLevel);
        context('log level: ' + logLevel, function () {
            if (logLevel >= oidc_client_1.Log[loggerName.toUpperCase()]) {
                it("should write to " + loggerName, function () {
                    spy.reset();
                    logger[loggerName]('Foo');
                    sinon.assert.calledOnce(spy);
                });
            }
            else {
                it("should NOT write to " + loggerName, function () {
                    spy.reset();
                    logger[loggerName]('Foo');
                    sinon.assert.notCalled(spy);
                });
            }
        });
    };
    describe('open-id-connect-logger', function () {
        var validLogLevels = [0, 1, 2, 3, 4];
        context('constructor', function () {
            it('should use Log.NONE if the user-defined level is undefined', function () {
                var logger = new index_internal_1.OpenIdConnectLogger(undefined);
                chai_1.assert.equal(logger.level, oidc_client_1.Log.NONE);
            });
            it('should throw if the level is invalid', function () {
                chai_1.assert.throws(function () { return new index_internal_1.OpenIdConnectLogger(5); });
                chai_1.assert.throws(function () { return new index_internal_1.OpenIdConnectLogger(-1); });
            });
            validLogLevels.forEach(function (logLevel) {
                it("should set open-id-connect and the oidc-client log to " + logLevel, function () {
                    var logger = new index_internal_1.OpenIdConnectLogger(logLevel);
                    chai_1.assert.equal(logger.level, logLevel);
                    chai_1.assert.equal(oidc_client_1.Log.level, logLevel);
                });
            });
            it('should set the oidc-client logger to \'console\'', function () {
                var _ = new index_internal_1.OpenIdConnectLogger(0);
                chai_1.assert.equal(oidc_client_1.Log.logger, console);
            });
        });
        var sandbox = sinon.createSandbox();
        var debug = sandbox.stub(console, 'debug').callsFake(function () { return undefined; });
        var info = sandbox.stub(console, 'info').callsFake(function () { return undefined; });
        var warn = sandbox.stub(console, 'warn').callsFake(function () { return undefined; });
        var error = sandbox.stub(console, 'error').callsFake(function () { return undefined; });
        validLogLevels.forEach(function (logLevel) {
            assertLoggerAction(logLevel, 'debug', debug);
            assertLoggerAction(logLevel, 'info', info);
            assertLoggerAction(logLevel, 'warn', warn);
            assertLoggerAction(logLevel, 'error', error);
        });
    });
});
//# sourceMappingURL=open-id-connect-logger.spec.js.map