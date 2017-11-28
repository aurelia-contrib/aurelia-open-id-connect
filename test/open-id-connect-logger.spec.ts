// tslint:disable-next-line:no-implicit-dependencies
import { assert } from 'chai';
import { Log } from 'oidc-client';
// tslint:disable-next-line:no-implicit-dependencies
import sinon = require('sinon');
import { OpenIdConnectLogger } from '../src/index-internal';

const assertLoggerAction = (
  logLevel: number,
  loggerName: string,
  spy: sinon.SinonSpy) => {

  const logger = new OpenIdConnectLogger(logLevel);

  context('log level: ' + logLevel, () => {

    if (logLevel >= (Log as any)[loggerName.toUpperCase()]) {
      it(`should write to ${loggerName}`, () => {
        // arrage
        spy.reset();
        // act
        (logger as any)[loggerName]('Foo');
        // assert
        sinon.assert.calledOnce(spy);
      });
    } else {
      it(`should NOT write to ${loggerName}`, () => {
        // arrage
        spy.reset();
        // act
        (logger as any)[loggerName]('Foo');
        // assert
        sinon.assert.notCalled(spy);
      });
    }
  });
};

describe('open-id-connect-logger', () => {

  const validLogLevels = [0, 1, 2, 3, 4];

  context('constructor', () => {

    it('should use Log.NONE if the user-defined level is undefined', () => {
      // act
      const logger = new OpenIdConnectLogger(undefined);
      // assert
      assert.equal(logger.level, Log.NONE);
    });

    it('should throw if the level is invalid', () => {
      // assert
      assert.throws(() => new OpenIdConnectLogger(5));
      assert.throws(() => new OpenIdConnectLogger(-1));
    });

    validLogLevels.forEach((logLevel) => {

      it(`should set open-id-connect and the oidc-client log to ${logLevel}`, () => {
        // act
        const logger = new OpenIdConnectLogger(logLevel);
        // assert
        assert.equal(logger.level, logLevel);
        assert.equal(Log.level, logLevel);
      });
    });

    it('should set the oidc-client logger to \'console\'', () => {
      // act
      // @ts-ignore We want to call the constructor without using its result.
      const _ = new OpenIdConnectLogger(0);
      // assert
      assert.equal(Log.logger, console);
    });
  });

  const sandbox = sinon.createSandbox();
  const debug = sandbox.stub(console, 'debug').callsFake(() => undefined);
  const info = sandbox.stub(console, 'info').callsFake(() => undefined);
  const warn = sandbox.stub(console, 'warn').callsFake(() => undefined);
  const error = sandbox.stub(console, 'error').callsFake(() => undefined);

  validLogLevels.forEach((logLevel) => {
    assertLoggerAction(logLevel, 'debug', debug);
    assertLoggerAction(logLevel, 'info', info);
    assertLoggerAction(logLevel, 'warn', warn);
    assertLoggerAction(logLevel, 'error', error);
  });
});
