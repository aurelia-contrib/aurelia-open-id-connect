import { Aurelia } from "aurelia-framework";
import oidcConfig from "./open-id-config";

// Configure Bluebird Promises.
// Note: You may want to use environment-specific configuration.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false,
  },
});

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin("./open-id", (callback) => callback(oidcConfig));

  aurelia.use.developmentLogging();
  aurelia.use.plugin("aurelia-testing");

  aurelia.start().then(() => aurelia.setRoot());
}
