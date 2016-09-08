import { OpenIdConnectRouting } from "../../../src/open-id-connect/index";
import { RouteConfig, NavigationInstruction } from "aurelia-router";
import * as TestObj from "./_test-objects.js";

describe("the OpenIdRouterConfigurationService", function () {

    describe("the ConfigureRouter method", function () {

        let openIdConnectRouting: OpenIdConnectRouting;

        let redirectRouteName: string = "redirectRoute";
        let postLogoutRedirectRouteName: string = "postLogoutRedirectRoute";

        let loginRedirectHandler: Function = (): Promise<any> => TestObj.EmptyPromise;
        let logoutRedirectHandler: Function = (): Promise<any> => TestObj.EmptyPromise;

        let routeCollection: Array<RouteConfig> = new Array<RouteConfig>();

        beforeEach(function () {

            openIdConnectRouting = new OpenIdConnectRouting(TestObj.openIdConnectConfiguration);

            spyOn(TestObj.routerConfiguration, "mapRoute").and.callFake((config) => {
                routeCollection.push(config);
            });

            openIdConnectRouting.ConfigureRouter(
                TestObj.routerConfiguration,
                loginRedirectHandler,
                logoutRedirectHandler);
        });

        it("adds two routes", function () {
            expect(TestObj.routerConfiguration.mapRoute).toHaveBeenCalledTimes(2);
        });

        it("adds a route for the redirect", function () {
            let route: RouteConfig = routeCollection.find(r => r.name === redirectRouteName);
            expect(route).not.toBeNull();
        });

        it("adds a redirect route that matches the configured redirect_uri", function () {
            let route: RouteConfig = routeCollection.find(r => r.name === redirectRouteName);
            expect(route.route).toBe("/foobar-signin-oidc");
        });

        it("adds a redirect route that redirects the router to the configured post login module", function (done) {
            let route: RouteConfig = routeCollection.find(r => r.name === redirectRouteName);
            let instruction: NavigationInstruction = TestObj.navigationInstruction;

            TestObj.wrapVoidPromise(() => route.navigationStrategy(instruction))
                .then(() => {
                    expect(instruction.config.moduleId).toBe(TestObj.openIdConnectConfiguration.LoginRedirectModuleId);
                    done();
                });
        });

        it("adds a route for the post logout redirect", function () {
            let route: RouteConfig = routeCollection.find(r => r.name === postLogoutRedirectRouteName);
            expect(route).not.toBeNull();
        });

        it("adds a post logout redirect route that matches the configured post_logout_redirect_uri", function () {
            let route: RouteConfig = routeCollection.find(r => r.name === postLogoutRedirectRouteName);
            expect(route.route).toBe("/foobar-signout-oidc");
        });

        it("adds a redirect route that redirects the router to the configured post logout module", function (done) {
            let route: RouteConfig = routeCollection.find(r => r.name === postLogoutRedirectRouteName);
            let instruction: NavigationInstruction = TestObj.navigationInstruction;

            TestObj.wrapVoidPromise(() => route.navigationStrategy(instruction))
                .then(() => {
                    expect(instruction.config.moduleId).toBe(TestObj.openIdConnectConfiguration.LogoutRedirectModuleId);
                    done();
                });
        });
   });
});

