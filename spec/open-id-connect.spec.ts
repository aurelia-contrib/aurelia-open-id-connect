import { RouterConfiguration } from "aurelia-router";
import { assert } from "chai";
import { UserManager } from "oidc-client";
import sinon = require("sinon");
import OpenIdConnect from "../src/open-id-connect";
import OpenIdConnectLogger from "../src/open-id-connect-logger";
import OpenIdConnectRouting from "../src/open-id-connect-routing";

describe("open-id-connect", () => {

    const openIdConnectRouting = sinon.createStubInstance(OpenIdConnectRouting);
    const logger = sinon.createStubInstance(OpenIdConnectLogger);
    const userManager = sinon.createStubInstance(UserManager);

    const openIdConnect = new OpenIdConnect(
        openIdConnectRouting,
        logger,
        userManager);

    context("configure", () => {
        it("should throw when routerConfiguration is undefined", () => {
            // assert
            assert.throws(() => openIdConnect.configure(undefined));
        });

        it("should throw when routerConfiguration is null", () => {
            // assert
            assert.throws(() => openIdConnect.configure(null));
        });

        it("should flow routerConfiguration to this.openIdConnectRouting.configureRouter", () => {
            // arrange
            const routerConfiguration = new RouterConfiguration();
            // act
            openIdConnect.configure(routerConfiguration);
            // assert
            sinon.assert.calledWith(
                openIdConnectRouting.configureRouter,
                routerConfiguration);
        });
    });

    context("login", () => {
        it("should forward call to this.userManager.signinRedirect", async () => {
            // act
            await openIdConnect.login();
            // assert
            sinon.assert.calledOnce(userManager.signinRedirect);
        });
    });

    context("logout", () => {
        it("should forward call to this.userManager.signoutRedirect", async () => {
            // act
            await openIdConnect.logout();
            // assert
            sinon.assert.calledOnce(userManager.signoutRedirect);
        });
    });

    context("loginSilent", () => {
        it("should forward call to this.userManager.signinSilent", async () => {
            // act
            await openIdConnect.loginSilent();
            // assert
            sinon.assert.calledOnce(userManager.signinSilent);
        });
    });
});
