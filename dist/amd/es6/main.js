define(["require", "exports", "./oidc-config"], function (require, exports, oidc_config_1) {
    "use strict";
    Promise.config({
        warnings: {
            wForgottenReturn: false,
        },
    });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .plugin("./open-id/open-id", (callback) => callback(oidc_config_1.default));
        aurelia.use.developmentLogging();
        aurelia.use.plugin("aurelia-testing");
        aurelia.start().then(() => aurelia.setRoot());
    }
    exports.configure = configure;
});
//# sourceMappingURL=main.js.map