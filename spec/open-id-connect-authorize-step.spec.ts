import {
    NavigationInstruction,
    NavigationInstructionInit,
    Next,
    Redirect,
} from "aurelia-router";
import { User, UserManager } from "oidc-client";
import sinon = require("sinon");
import { OpenIdConnectRoles } from "../src";
import { OpenIdConnectAuthorizeStep, OpenIdConnectLogger } from "../src/index-internal";

describe("open-id-connect-authorize-step", () => {

    const unauthorizedRedirectModuleId = "/";

    const logger = sinon.createStubInstance(OpenIdConnectLogger);
    const userManager = sinon.createStubInstance(UserManager);
    const authorizationStep = new OpenIdConnectAuthorizeStep(userManager, logger);
    const navigationInstruction = sinon.createStubInstance(NavigationInstruction);

    const createConfigForRoles = (...roles: OpenIdConnectRoles[]) => {
        return {
            config: {
                settings: {
                    roles,
                },
            },
        } as NavigationInstructionInit;
    };

    // Is there a better way to spy on/stub a function that has properties/methods?
    const next = Object.assign(
        sinon.spy(),
        {
            cancel: sinon.spy(),
        },
    ) as any;

    context("run", () => {

        context("if navigation instruction requires the Authenticated role", () => {

            const instruction = new NavigationInstruction(
                createConfigForRoles(OpenIdConnectRoles.Authenticated));

            (navigationInstruction.getAllInstructions).returns([instruction]);

            it(`should redirect to ${unauthorizedRedirectModuleId} if user is null`, async () => {
                // arrange
                (userManager.getUser).returns(null);
                // act
                await authorizationStep.run(navigationInstruction, next);
                // assert
                sinon.assert.calledOnce(next.cancel);
            });

            it(`should NOT redirect to ${unauthorizedRedirectModuleId} if user is not null`, async () => {
                // arrange
                (userManager.getUser).returns({});
                // act
                await authorizationStep.run(navigationInstruction, next);
                // assert
                sinon.assert.calledOnce(next);
            });
        });
    });
});
