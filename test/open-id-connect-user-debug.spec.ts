// tslint:disable-next-line:no-implicit-dependencies
import { assert } from 'chai';
// tslint:disable-next-line:no-implicit-dependencies
import sinon = require('sinon');
import { OpenIdConnect } from '../src';
import { OpenIdConnectUserDebug } from '../src/index-internal';

describe('open-id-connect-user-debug', () => {

    const openIdConnect = sinon.createStubInstance(OpenIdConnect);
    const userDebug = new OpenIdConnectUserDebug(openIdConnect);

    context('loginSilent', () => {
        it('should call openIdConnect.loginSilent', async () => {
            // act
            await userDebug.loginSilent();
            // assert
            sinon.assert.calledOnce(openIdConnect.loginSilent);
        });

        context('if loginSilent throws', () => {

            it('should call openIdConnect.login when error is login_required', async () => {
                // arrange
                const error = { error: 'login_required' };
                (openIdConnect.loginSilent as sinon.SinonStub).throws(error);
                // act
                await userDebug.loginSilent();
                // assert
                sinon.assert.calledOnce(openIdConnect.login);
            });

            it('should rethrow when error is NOT login_required', async () => {
                // arrange
                const expected = new Error('NOT login_required');
                (openIdConnect.loginSilent as sinon.SinonStub).throws(expected);
                let actual;
                try {
                    // act
                    await userDebug.loginSilent();
                } catch (err) {
                    actual = err;
                } finally {
                    // assert
                    assert.equal(actual, expected);
                }
            });
        });
    });

    context('stringifiedUser', () => {
        it('should return a JSON representation of the user', async () => {
            // arrange
            const expected = { foo: 'foo', bar: 'bar' };
            openIdConnect.getUser.returns(expected);
            await userDebug.attached();
            // act
            const actual = JSON.parse(userDebug.stringifiedUser);
            // assert
            assert.deepEqual(actual, expected);
        });
    });
});
