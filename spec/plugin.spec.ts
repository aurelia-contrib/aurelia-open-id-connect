import OpenIdConnectConfiguration from "../src/open-id-connect-configuration";
import plugin from "../src/plugin";
import "./helpers/global-setup";

describe("plugin", () => {

    let frameworkConfiguration: any;
    let actualLoginRedirectModuleId: string;
    const userDefinedLoginRedirectModuleId: string = Math.random().toString();

    // tslint:disable-next-line:only-arrow-functions
    beforeEach(function() {

        // arrange
        frameworkConfiguration = jasmine.createSpyObj(
            "frameworkConfig",
            ["globalResources", "container"]);

        frameworkConfiguration.container.get =
            jasmine.createSpy("get").and.returnValue({ debug: () => undefined });

        frameworkConfiguration.container.registerInstance =
            jasmine.createSpy("registerInstance").and.callFake((type, obj) => {
                if (obj instanceof OpenIdConnectConfiguration) {
                    actualLoginRedirectModuleId = obj.loginRedirectModuleId;
                }
            });

        // act
        plugin(
            frameworkConfiguration,
            (openIdConnectConfig) => {
                openIdConnectConfig.loginRedirectModuleId = userDefinedLoginRedirectModuleId;
            });
    });

    it("should add two global resources", () => {
        // assert
        expect(frameworkConfiguration.globalResources).toHaveBeenCalledTimes(1);
    });

    it("should pass the user-specified configuration to the framework container", () => {
        // assert
        expect(actualLoginRedirectModuleId).toBe(userDefinedLoginRedirectModuleId);
    });
});
