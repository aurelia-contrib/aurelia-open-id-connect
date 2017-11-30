import { assert } from 'chai';
import OpenIdConnectFactory from '../src/open-id-connect-factory';

const factory = new OpenIdConnectFactory();

describe('open-id-connect-factory', () => {

  it('createOpenIdConnectConfiguration returns truthy result', () => {
    // arrange
    const config = {} as any;
    // act
    const result = factory.createOpenIdConnectConfiguration(config);
    // assert
    assert.isOk(result);
  });

  it('createOpenIdConnectLogger returns truthy result', () => {
    // arrange
    const level = 4;
    // act
    const result = factory.createOpenIdConnectLogger(level);
    // assert
    assert.isOk(result);
  });

  it('createUserManagerSettings returns truthy result', () => {
    // arrange
    const settings = {} as any;
    // act
    const result = factory.createUserManager(settings);
    // assert
    assert.isOk(result);
  });
});
