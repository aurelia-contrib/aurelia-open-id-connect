define(["require", "exports", "./open-id-connect-configuration", "./environment"], function (require, exports, open_id_connect_configuration_1, environment_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false,
        },
    });
    function configure(aurelia) {
        if (environment_1.default.useHttps && location.protocol !== "https:") {
            location.href = "https:" + window.location.href.substring(window.location.protocol.length);
        }
        aurelia.use
            .standardConfiguration()
            .plugin("aurelia-open-id-connect", function (callback) { return callback(open_id_connect_configuration_1.default); });
        aurelia.use.globalResources("./navbar.html");
        aurelia.use.developmentLogging();
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});
//# sourceMappingURL=main.js.map