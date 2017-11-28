import { autoinject, customElement } from 'aurelia-framework';
import OpenIdConnectUserBlock from './open-id-connect-user-block';

@autoinject
@customElement('open-id-connect-user-debug')
export default class extends OpenIdConnectUserBlock {

  public async loginSilent() {
    try {
      this.openIdConnect.loginSilent();
    } catch (err) {
      if (err.error !== 'login_required') {
        // TODO: Check the JavaScript specification on Error and check
        // the OpenID Connect specification for the nesting of an error
        // inside the err object.
        throw err;
      }

      this.login();
    }
  }

  public get stringifiedUser(): string {
    return JSON.stringify(this.user, undefined, 2);
  }
}
