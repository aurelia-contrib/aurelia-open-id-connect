import { assert } from "chai";
import { UserManager } from "oidc-client";
import sinon = require("sinon");
import { OpenIdConnect } from "../src";
import { OpenIdConnectUserDebug } from "../src/index-internal";

describe("open-id-connect-user-debug", () => {

    const openIdConnect = sinon.createStubInstance(OpenIdConnect);
    const userDebug = new OpenIdConnectUserDebug(openIdConnect);

    context("stringifiedUser", () => {
        it("should return a JSON representation of the user", async () => {
            // arrange
            const expected = { foo: "foo", bar: "bar" };
            openIdConnect.getUser.returns(expected);
            await userDebug.attached();
            // act
            const actual = JSON.parse(userDebug.stringifiedUser);
            // assert
            assert.deepEqual(actual, expected);
        });
    });
});
