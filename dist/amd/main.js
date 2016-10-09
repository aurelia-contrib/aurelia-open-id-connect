"use strict";

define(["require", "exports", "./open-id-connect-configuration"], function (require, exports, open_id_connect_configuration_1) {
    "use strict";

    Promise.config({
        warnings: {
            wForgottenReturn: false
        }
    });
    function configure(aurelia) {
        aurelia.use.standardConfiguration().plugin("./open-id-connect", function (callback) {
            return callback(open_id_connect_configuration_1.default);
        });
        aurelia.use.globalResources("./navbar.html");
        aurelia.use.developmentLogging();
        aurelia.use.plugin("aurelia-testing");
        aurelia.start().then(function () {
            return aurelia.setRoot();
        });
    }
    exports.configure = configure;
});
//# sourceMappingURL=main.js.map