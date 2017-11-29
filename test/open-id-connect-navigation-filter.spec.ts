import { NavModel } from 'aurelia-router';
import { assert } from 'chai';
import sinon = require('sinon');
import { OpenIdConnectRoles } from '../src';
import { OpenIdConnectNavigationFilter } from '../src/index-internal';

describe('open-id-connect-navigation-filter', () => {

  const createNavModelsWithEmptySettings = (count: number) => Array
    .apply(null, Array(count))
    .map(() => {
      const model = sinon.createStubInstance(NavModel);
      model.settings = {};
      return model;
    });

  const filter = new OpenIdConnectNavigationFilter();

  context('toView', () => {
    [undefined, null].forEach((rolesValue) => {
      it(`should include all navModels that have ${rolesValue} roles `, () => {
        // arrange
        const user = {} as any;
        const total = 5;
        const navModels = createNavModelsWithEmptySettings(total)
          .map((navModel: NavModel, index: number) => {
            navModel.settings.roles = rolesValue;
            return navModel;
          });

        // act
        const result = filter.toView(navModels, user);
        // assert
        assert.equal(result.length, total);
      });
    });

    context(`if some navModels require the Authenticated role`, () => {

      // arrange
      const total = 10;
      const requiresAuthenticated = 5;

      const navModels = createNavModelsWithEmptySettings(total)
        .map((navModel: NavModel, index: number) => {
          if (index < requiresAuthenticated) {
            navModel.settings.roles = [OpenIdConnectRoles.Authenticated];
          }
          return navModel;
        });

      it(`should include all navModels when the user is not null`, () => {
        // arrange
        const user = {} as any;
        // act
        const result = filter.toView(navModels, user);
        // assert
        assert.equal(result.length, total);
      });

      it(`should filter restricted navModels when the user is null`, () => {
        // arrange
        const user: any = null;
        // act
        const result = filter.toView(navModels, user);
        // assert
        assert.equal(result.length, requiresAuthenticated);
      });
    });
  });
});
