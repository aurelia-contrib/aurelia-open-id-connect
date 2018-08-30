import { assert } from 'chai';
import { User } from 'oidc-client';
import sinon = require('sinon');
import { OpenIdConnect } from '../src';
import { OpenIdConnectUserBlock } from '../src/index-internal';

describe('open-id-connect-user-block', () => {

  const user: User = {} as any;
  const handlers: any = {};
  const openIdConnect = sinon.createStubInstance(OpenIdConnect);
  openIdConnect.getUser = sinon.stub().returns(user);
  openIdConnect.addOrRemoveHandler = sinon.stub().callsFake(
    (key: string, value: () => void) => handlers[key] = value);

  const userBlock = new OpenIdConnectUserBlock(openIdConnect);

  context('attached', () => {
    ['addUserUnloaded', 'addUserLoaded'].forEach((handlerName) => {
      it(`should add ${handlerName} to this.openIdConnect handler collection`, async () => {
        // act
        await userBlock.attached();

        // assert
        sinon.assert.calledWith(openIdConnect.addOrRemoveHandler, handlerName);
      });

      it(`should set user when addUserLoaded handler is called`, async () => {
        // arrange
        userBlock.user = null;
        // act
        await userBlock.attached();
        handlers.addUserLoaded();
        // assert
        assert.equal(userBlock.user, user);
      });

      it(`should clear user when addUserUnloaded handler is called`, async () => {
        // arrange
        userBlock.user = user;
        // act
        await userBlock.attached();
        handlers.addUserUnloaded();
        // assert
        assert.isNull(userBlock.user);
      });
    });
  });

  context('isLoggedIn', () => {
    [null, undefined].forEach((val) => {
      it(`should return false when the user is ${val}`, async () => {
        // arrange
        openIdConnect.getUser.returns(val);
        await userBlock.attached();
        // assert
        assert.isFalse(userBlock.isLoggedIn);
      });
    });

    it('should return true when the user is an object', async () => {
      // arrange
      openIdConnect.getUser.returns({});
      await userBlock.attached();
      // assert
      assert.isTrue(userBlock.isLoggedIn);
    });
  });

  context('login', () => {
    it('should call openIdConnect.login', async () => {
      // act
      userBlock.login();
      // assert
      sinon.assert.calledOnce(openIdConnect.login);
    });
  });

  context('logout', () => {
    it('should call openIdConnect.logout', async () => {
      // act
      userBlock.logout();
      // assert
      sinon.assert.calledOnce(openIdConnect.logout);
    });
  });
});
