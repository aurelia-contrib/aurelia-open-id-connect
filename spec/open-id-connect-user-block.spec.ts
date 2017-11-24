import { assert } from "chai";
import { UserManager } from "oidc-client";
import sinon = require("sinon");
import { OpenIdConnect } from "../src";
import { OpenIdConnectUserBlock } from "../src/index-internal";

describe("open-id-connect-user-block", () => {

    const openIdConnect = sinon.createStubInstance(OpenIdConnect);
    const userBlock = new OpenIdConnectUserBlock(openIdConnect);

    context("isLoggedIn", () => {
        [null, undefined].forEach((val) => {
            it(`should return false when the user is ${val}`, async () => {
                // arrange
                openIdConnect.getUser.returns(val);
                await userBlock.attached();
                // assert
                assert.isFalse(userBlock.isLoggedIn);
            });
        });

        it("should return true when the user is an object", async () => {
            // arrange
            openIdConnect.getUser.returns({});
            await userBlock.attached();
            // assert
            assert.isTrue(userBlock.isLoggedIn);
        });
    });

    context("login", () => {
        it("should call openIdConnect.login", async () => {
            // act
            userBlock.login();
            // assert
            sinon.assert.calledOnce(openIdConnect.login);
        });
    });

    context("logout", () => {
        it("should call openIdConnect.logout", async () => {
            // act
            userBlock.logout();
            // assert
            sinon.assert.calledOnce(openIdConnect.logout);
        });
    });
});
