import { UserManager } from 'oidc-client';
import { OpenIdConnectConfigurationManager } from './open-id-connect-configuration-manager';
import { OpenIdConnectLogger } from './open-id-connect-logger';
var OpenIdConnectFactory = /** @class */ (function () {
    function OpenIdConnectFactory() {
    }
    OpenIdConnectFactory.prototype.createOpenIdConnectConfiguration = function (dto) {
        return new OpenIdConnectConfigurationManager(dto);
    };
    OpenIdConnectFactory.prototype.createOpenIdConnectLogger = function (level) {
        return new OpenIdConnectLogger(level);
    };
    OpenIdConnectFactory.prototype.createUserManager = function (settings) {
        return new UserManager(settings);
    };
    return OpenIdConnectFactory;
}());
export { OpenIdConnectFactory };
