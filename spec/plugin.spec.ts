import { assert } from "chai";
import OpenIdConnectConfiguration from "../src/open-id-connect-configuration";
import plugin from "../src/plugin";

describe("plugin", () => {

    // tslint:disable-next-line:only-arrow-functions
    beforeEach(function() {

        // arrange
        console.log("Foo");
        console.log(window.location.href);

        // act
        
    });

    it("should add two global resources", () => {
        // assert
        console.log("Bar");
        assert.fail();
    });

    it("should pass the user-specified configuration to the framework container", () => {
        // assert
        console.log("Baz");
        assert.fail();
    });
});
