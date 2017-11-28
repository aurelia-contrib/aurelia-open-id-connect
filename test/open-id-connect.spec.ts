import { Router, RouterConfiguration } from "aurelia-router";
import { assert } from "chai";
import { User, UserManager, UserManagerEvents } from "oidc-client";
import sinon = require("sinon");
import { OpenIdConnect } from "../src";
import {
    OpenIdConnectConfigurationManager,
    OpenIdConnectLogger,
    OpenIdConnectRouting,
} from "../src/index-internal";

describe("open-id-connect", () => {

    const openIdConnectRouting = sinon.createStubInstance(OpenIdConnectRouting);
    const logger = sinon.createStubInstance(OpenIdConnectLogger);
    const userManager = sinon.createStubInstance(UserManager);
    const router = sinon.createStubInstance(Router);
    const configurationManager = sinon.createStubInstance(OpenIdConnectConfigurationManager);

    const events = {
        addUserLoaded: sinon.spy(),
        addUserUnloaded: sinon.spy(),
    };

    sinon.stub(userManager, "events").get(() => events);

    const openIdConnect = new OpenIdConnect(
        openIdConnectRouting,
        router,
        configurationManager,
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
        it("should call this.userManager.signinRedirect", async () => {
            // act
            await openIdConnect.login();
            // assert
            sinon.assert.calledOnce(userManager.signinRedirect);
        });
    });

    context("logout", () => {
        it("should call this.userManager.signoutRedirect", async () => {
            // act
            await openIdConnect.logout();
            // assert
            sinon.assert.calledOnce(userManager.signoutRedirect);
        });
    });

    context("loginSilent", () => {
        it("should return result of this.userManager.signinSilent", async () => {
            // arrange
            const expected = Promise.resolve({ id_token: "id_token" } as User);
            userManager.signinSilent.returns(expected);
            // act
            const actual = openIdConnect.loginSilent();
            // assert
            assert.equal(await actual, await expected);
        });
    });

    context("getUser", () => {
        it("should return result of this.userManager.getUser", async () => {
            // arrange
            const expected = Promise.resolve({ id_token: "id_token" } as User);
            userManager.getUser.returns(expected);
            // act
            const actual = openIdConnect.getUser();
            // assert
            assert.equal(await actual, await expected);
        });
    });

    context("handlers", () => {
        it("should invoke method on underlying events object", async () => {
            // act
            openIdConnect.addOrRemoveHandler("addUserLoaded", () => undefined);
            // assert
            sinon.assert.calledOn(events.addUserLoaded, events);
        });

        it("should throw when the key does not start with add/remove", async () => {
            // assert
            assert.throws(() => openIdConnect.addOrRemoveHandler("load", () => undefined));
        });
    });
});
