# Why?

This plugin adapts `oidc-client-js` to the Aurelia router. While it is possible to use the `oidc-client-js` on its own, you will find yourself writing a fair amount of code to handling the routing within Aurelia.

# Alpha

This is [Alpha software][alpha-software]: it is complete enough for *internal* testing.

If the most recent `aurelia-open-id-connect` release does not work, try an [earlier or later one][0] such as `0.11.2`.

# Demo Projects

The demos have an example of how to configure everything. 

### Smaller Demo(s)

https://github.com/shaunluttin/aurelia-open-id-connect-demos

### Larger, LIVE Demo

See it LIVE here: https://zamboni-app.azurewebsites.net

# Usage 

### Create an Aurelia application

We use the [Aurelia CLI][aurelia-cli].

    au new

We use TypeScript and RequireJS. After creating the app, enter its directory and build.

    cd aurelia-app
    au build

### Install the aurelia-open-id-connect package

Install from NPM.

    npm install --save aurelia-open-id-connect

Alternatively, install from GitHub [with an optional commit-ish].

    npm install --save shaunluttin/aurelia-open-id-connect[#<commit-ish>]

Note: sometimes we need to install UNMET PEER DEPENDENCIES such as `babel-polyfill`.

### Add aurelia-open-id-connect to Aurelia

We use the Aurelia CLI, so we add the following to `aurelia.json` in a bundle.

    {
        "name": "aurelia-open-id-connect",
        "path": "../node_modules/aurelia-open-id-connect/dist/amd",
        "main": "index"
    },
    "oidc-client"

**Also** set `build.loader.plugins.stub = false` to load the plugin's HTML. 
(TODO: Verify that this is necessary.)

### Configure the OpenID Connect client

Create a `src/open-id-connect-configuration.ts` file that specifies the Open ID Connect configuration. There is an [example here](/open-id-connect-configuration.ts.example).

In your `src/main.ts`, import the configuration file, add the plugin, and invoke the callback, returning the imported configuration. 

    import oidcConfig from "./open-id-connect-configuration";

    aurelia.use
      .plugin("aurelia-open-id-connect", () => oidcConfig);

### Change the Aurelia Container

If your application adds the `aurelia-app` property to the `body`...

    <body aurelia-app="main">
       <!-- Some placeholder content -->
       <script src="scripts/main.js" data-main="aurelia-bootstrapper"/>
    </body>

...then move the `aurelia-app` property to a wrapper `div` like this...

    <body>
      <div aurelia-app="main">
        <!-- Some placeholder content -->
        <script src="scripts/main.js" data-main="aurelia-bootstrapper"/>
      </div>
    </body>

Why?

> Aurelia was replacing the complete body element's contents, hence the disappearing iframe. The fix was to create a child div element where Aurelia puts its contents. Now everything works! ~ @ErikSchierboom

Thank you @RichiCoder1, @bewl, and @mttmccb for help to find the fix: https://github.com/shaunluttin/aurelia-open-id-connect/issues/4

### Add the user-block and router view.

Add the global resources to `app.html` (or to another appropriate view).

    <template>
      <open-id-connect-user-block></open-id-connect-user-block>
      <open-id-connect-user-debug></open-id-connect-user-debug>
      <ul>
          <li repeat.for="nav of router.navigation | openIdConnectNavigation:user">
            <a href.bind="nav.href">${nav.title}</a>
          </li>
      </ul>
      <router-view></router-view>
    </template>

### Configure routing

Configure routing in the app.ts file and setup user-observation.

    import { autoinject } from "aurelia-framework";
    import { RouterConfiguration, Router } from "aurelia-router";
    import { User } from "oidc-client";
    import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";

    @autoinject
    export class App {

      private router: Router;
      private user: User;

      constructor(private openIdConnect: OpenIdConnect) {
          this.openIdConnect.observeUser((user: User) => this.user = user);
      }

      public configureRouter(routerConfiguration: RouterConfiguration, router: Router) {

        // switch from hash (#) to slash (/) navigation
        routerConfiguration.options.pushState = true;
        routerConfiguration.title = "OpenID Connect Implicit Flow Demo";

        // configure routes
        routerConfiguration.map([
            {
                moduleId: "index",
                name: "index",
                route: ["", "index"],
                title: "index",
                nav: true,
            },
            {
                moduleId: "private",
                name: "private",
                route: ["private"],
                title: "private",
                nav: true,
                settings: {
                    roles: [OpenIdConnectRoles.Authenticated],
                }
            },
        ]);

        this.openIdConnect.configure(routerConfiguration);
        this.router = router;
      }
    }

### Add simple views that map to the routing.

index.html

    <template></template>

index.ts
 
    export class Index { }

private.html

    <template></template>

private.ts
 
    export class Private { }

### Run your application

    npm install
    au build
    au run

# Implicit Flow Implementor Guide

The [OpenID Connect Implicit Client Implementer's Guide 1.0][1] contains a subset of the OpenID Connect Core 1.0 specification.

It is designed to be easy to read and implement for basic Web-based Relying Parties using the OAuth 2.0 Implicit Flow.

[0]: https://github.com/shaunluttin/aurelia-open-id-connect/releases
[1]: http://openid.net/specs/openid-connect-implicit-1_0.html
[alpha-software]: https://blog.codinghorror.com/alpha-beta-and-sometimes-gamma/
[aurelia-cli]: https://www.npmjs.com/package/aurelia-cli
