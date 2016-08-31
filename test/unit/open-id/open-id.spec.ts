import { OpenId } from "../../../src/open-id/open-id";
import * as TestObj from "./_test-objects.js";

describe("the OpenId class", function () {

    let openId = new OpenId(TestObj.openIdRouterConfigurationService, TestObj.openIdLogger, TestObj.userManager);

    describe("the Configure method", function () {

        beforeEach(function () {
            spyOn(TestObj.openIdRouterConfigurationService, "ConfigureRouter");
        });

        it("configures the Aurelia router via the RouterConfigurationService", function () {
            let routerConfiguration = null;
            openId.Configure(routerConfiguration);
            expect(TestObj.openIdRouterConfigurationService.ConfigureRouter).toHaveBeenCalled();
        });
    });

    describe("the Login method", function () {

        beforeEach(function () {
            spyOn(TestObj.userManager, "signinRedirect");
        });

        it("calls UserManager.signinRedirect", function () {
            openId.Login();
            expect(TestObj.userManager.signinRedirect).toHaveBeenCalled();
        });
    });

    describe("the Logout method", function () {

        beforeEach(function () {
            spyOn(TestObj.userManager, "signoutRedirect");
        });

        it("calls UserManager.signoutRedirect", function () {
            openId.Logout();
            expect(TestObj.userManager.signoutRedirect).toHaveBeenCalled();
        });
    });

    describe("the LoginRedirectHandler", function () {

        beforeEach(function () {
            spyOn(TestObj.userManager, "signinRedirectCallback");
        });

        it("calls UserManager.siginRedirectCallback if the user is NOT signed in", function (done) {

            spyOn(TestObj.userManager, "getUser").and
                .returnValue(TestObj.EmptyPromise);

            openId.LoginRedirectHandler().then(() => {
                expect(TestObj.userManager.getUser).toHaveBeenCalled();
                expect(TestObj.userManager.signinRedirectCallback).toHaveBeenCalled();
                done();
            });
        });

        it("does NOT call UserManager.siginRedirectCallback if the user is signed in", function (done) {

            spyOn(TestObj.userManager, "getUser").and
                .returnValue(TestObj.MockUser);

            openId.LoginRedirectHandler().then(() => {

                expect(TestObj.userManager.getUser).toHaveBeenCalled();
                expect(TestObj.userManager.signinRedirectCallback).toHaveBeenCalled();
                done();
            });
        });
    });

    describe("the PostLogoutRedirectHandler", function () {

        beforeEach(function () {
            spyOn(TestObj.userManager, "signoutRedirectCallback");
        });

        it("calls UserManager.signoutRedirectCallback", function () {
            openId.PostLogoutRedirectHandler();
            expect(TestObj.userManager.signoutRedirectCallback).toHaveBeenCalled();
        });
    });

});
