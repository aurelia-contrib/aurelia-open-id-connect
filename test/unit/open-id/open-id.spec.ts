import { OpenIdConnect } from "../../../src/open-id-connect/index";
import * as TestObj from "./_test-objects.js";

describe("the OpenId class", function () {

    let openIdConnect = new OpenIdConnect(TestObj.openIdConnectRouting, TestObj.openIdConnectLogger, TestObj.userManager);

    describe("the Configure method", function () {

        beforeEach(function () {
            spyOn(TestObj.openIdConnectRouting, "ConfigureRouter");
        });

        it("configures the Aurelia router via the RouterConfigurationService", function () {
            let routerConfiguration = null;
            openIdConnect.Configure(routerConfiguration);
            expect(TestObj.openIdConnectRouting.ConfigureRouter).toHaveBeenCalled();
        });
    });

    describe("the Login method", function () {

        beforeEach(function () {
            spyOn(TestObj.userManager, "signinRedirect");
        });

        it("calls UserManager.signinRedirect", function () {
            openIdConnect.Login();
            expect(TestObj.userManager.signinRedirect).toHaveBeenCalled();
        });
    });

    describe("the Logout method", function () {

        beforeEach(function () {
            spyOn(TestObj.userManager, "signoutRedirect");
        });

        it("calls UserManager.signoutRedirect", function () {
            openIdConnect.Logout();
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

            openIdConnect.LoginRedirectHandler().then(() => {
                expect(TestObj.userManager.getUser).toHaveBeenCalled();
                expect(TestObj.userManager.signinRedirectCallback).toHaveBeenCalled();
                done();
            });
        });

        it("does NOT call UserManager.siginRedirectCallback if the user is signed in", function (done) {

            spyOn(TestObj.userManager, "getUser").and
                .returnValue(TestObj.MockUser);

            openIdConnect.LoginRedirectHandler().then(() => {

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
            openIdConnect.PostLogoutRedirectHandler();
            expect(TestObj.userManager.signoutRedirectCallback).toHaveBeenCalled();
        });
    });

});
