import { assert } from "chai";
import sinon = require("sinon");
import OpenIdConnect from "../src/open-id-connect";
import OpenIdConnectUserDebug from "../src/open-id-connect-user-debug";

describe("open-id-connect-user-debug", () => {

    const openIdConnect = sinon.createStubInstance(OpenIdConnect);
    const userDebug = new OpenIdConnectUserDebug(openIdConnect);

    context("isLoggedIn", () => {
        [null, undefined].forEach((val) => {
            it(`should return false when the user is ${val}`, async () => {
                // arrange
                openIdConnect.getUser.returns(val);
                await userDebug.attached();
                // assert
                assert.isFalse(userDebug.isLoggedIn);
            });
        });

        it("should return true when the user is an object", async () => {
            // arrange
            openIdConnect.getUser.returns({});
            await userDebug.attached();
            // assert
            assert.isTrue(userDebug.isLoggedIn);
        });
    });

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
