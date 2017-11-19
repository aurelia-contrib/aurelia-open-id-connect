import { Container, FrameworkConfiguration } from "aurelia-framework";
import { UserManager } from "oidc-client";
import sinon = require("sinon");
import OpenIdConnectConfiguration from "../src/open-id-connect-configuration";
import OpenIdConnectLogger from "../src/open-id-connect-logger";
import plugin from "../src/plugin";

describe("plugin", () => {

    // arrange
    const logger = sinon.createStubInstance(OpenIdConnectLogger);

    const container = sinon.createStubInstance(Container);
    container.get.withArgs(OpenIdConnectLogger).returns(logger);

    const frameworkConfig = sinon.createStubInstance(FrameworkConfiguration);
    frameworkConfig.container = container;

    const userDefinedLoginRedirect = "userDefinedLoginRedirect";
    const userDefinedAuthority = "userDefinedAuthority";

    const pluginCallback = sinon.stub().callsFake((config: OpenIdConnectConfiguration) => {
        // mimic the user-defined configuration that happens in src/main.ts.
        config.loginRedirectModuleId = userDefinedLoginRedirect;
        config.userManagerSettings.authority = userDefinedAuthority;
    });

    // tslint:disable-next-line:only-arrow-functions
    beforeEach(function() {
        // act
        plugin(frameworkConfig, pluginCallback);
    });

    const resourcesToAdd = [
        "./open-id-connect-user-block",
        "./open-id-connect-user-debug",
        "./open-id-connect-role-filter",
    ];

    it(`should add these to global resources \r\n\t${resourcesToAdd.join("\r\n\t")}`, () => {
        // assert
        sinon.assert.calledWith(frameworkConfig.globalResources, resourcesToAdd);
    });

    it("should register a UserManager instance that has user-defined configuration", () => {

        // Use the `any` type for the userManager, because the oidc-client
        // type declarations do not include the settings property.
        const matcher = sinon.match((userManager: any) =>
            userManager.settings.authority === userDefinedAuthority);

        // assert
        sinon.assert.calledWith(
            container.registerInstance,
            UserManager,
            matcher);
    });

    it("should register an OpenIdConnectConfiguration instance that has user-defined configuration", () => {

        const matcher = sinon.match((config: OpenIdConnectConfiguration) =>
            config.loginRedirectModuleId === userDefinedLoginRedirect);

        // assert
        sinon.assert.calledWith(
            container.registerInstance,
            OpenIdConnectConfiguration,
            matcher);
    });
});
