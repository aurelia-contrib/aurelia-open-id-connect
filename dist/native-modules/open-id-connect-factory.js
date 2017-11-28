import { UserManager } from 'oidc-client';
import OpenIdConnectConfigurationManager from './open-id-connect-configuration-manager';
import OpenIdConnectLogger from './open-id-connect-logger';
var default_1 = (function () {
    function default_1() {
    }
    default_1.prototype.createOpenIdConnectConfiguration = function (dto) {
        return new OpenIdConnectConfigurationManager(dto);
    };
    default_1.prototype.createOpenIdConnectLogger = function (level) {
        return new OpenIdConnectLogger(level);
    };
    default_1.prototype.createUserManager = function (settings) {
        return new UserManager(settings);
    };
    return default_1;
}());
export default default_1;
//# sourceMappingURL=open-id-connect-factory.js.map