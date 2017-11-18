import { assert } from "chai";
import sinon = require("sinon");
import OpenIdConnectConfiguration from "../src/open-id-connect-configuration";
import plugin from "../src/plugin";

describe("plugin", () => {

    // tslint:disable-next-line:only-arrow-functions
    beforeEach(function() {

        // arrange
        console.log("Foo");
        console.log(window.location.href);

        const frameworkConfig = {} as any;
        const callback = (c: OpenIdConnectConfiguration) => undefined;

        // act
        plugin(frameworkConfig, callback);
    });

    it("should add two global resources", () => {
        // assert
        // assert(frameworkConfiguration.globalResources).toHaveBeenCalledTimes(1);
        console.log("Bar");
        assert.fail();
    });

    it("should pass the user-specified configuration to the framework container", () => {
        // assert
        console.log("Baz");
        assert.fail();
    });
});
