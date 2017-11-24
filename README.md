# Why?

This plugin adapts `oidc-client-js` to the Aurelia router. While it is possible to use the `oidc-client-js` on its own, you will find yourself writing a fair amount of code to handling the routing within Aurelia.

# Alpha

This is [Alpha software][alpha-software]: it is complete enough for *internal* testing.

If the most recent `aurelia-open-id-connect` release does not work, try an [earlier or later one][0] such as `0.11.2`.

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
        "main": "index",
        "resources": [
            "open-id-connect-user-block.html",
            "open-id-connect-user-block.js",
            "open-id-connect-user-debug.html",
            "open-id-connect-user-debug.js"
        ]
    },
    "oidc-client"

**Also** set `build.loader.plugins.stub = false` to load the plugin's HTML. (TODO: Verify that this is necessary.)

### Configure the OpenID Connect client

Create a `src/open-id-connect-configuration.ts` file that specifies the Open ID Connect configuration. There is an [example here](/open-id-connect-configuration.ts.example).

In your `src/main.ts`, import the configuration file, add the plugin, and invoke the callback, passing it the imported configuration. 

    import oidcConfig from "./open-id-connect-configuration";
    import { OpenIdConnectConfiguration } from "aurelia-open-id-connect";

    aurelia.use
      .plugin("aurelia-open-id-connect", (config: OpenIdConnectConfiguration) => {
        config.userManagerSettings = oidcConfig.userManagerSettings;
        config.loginRedirectModuleId = oidcConfig.loginRedirectModuleId;
        config.logoutRedirectModuleId = oidcConfig.logoutRedirectModuleId;
      });

### Add the user-block and router view.

We add the `user-block` to the app.html view.

    <template>
      <h1>${message}</h1>
      <open-id-connect-user-block></open-id-connect-user-block>
      <router-view></router-view>
    </template>

### Change the Aurelia Container

Normally you application would look like this:

    <body aurelia-app="main">
       <!-- Some placeholder content -->
       <script src="scripts/main.js" data-main="aurelia-bootstrapper"/>
    </body>

...but what you'd do instead is:

    <body>
      <div aurelia-app="main">
        <!-- Some placeholder content -->
        <script src="scripts/main.js" data-main="aurelia-bootstrapper"/>
      </div>
    </body>

> Aurelia was replacing the complete body element's contents, hence the disappearing iframe. The fix was to create a child div element where Aurelia puts its contents. Now everything works! ~ @ErikSchierboom

Thank you @RichiCoder1, @bewl, and @mttmccb for help to find the fix: https://github.com/shaunluttin/aurelia-open-id-connect/issues/4

### Configure routing

Configure routing in the app.ts file.

    import { autoinject } from "aurelia-framework";
    import { RouterConfiguration, Router } from "aurelia-router";
    import { User, Log } from "oidc-client";
    import { OpenIdConnect, OpenIdConnectRoles } from "aurelia-open-id-connect";

    @autoinject
    export class App {

      private router: Router;
      private user: User;

      constructor(private openIdConnect: OpenIdConnect) {
        this.openIdConnect.userManager.getUser().then((user) => {
          this.user = user;
        });
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
          },
        ]);

        this.openIdConnect.configure(routerConfiguration);
        this.router = router;
      }
    }

Add a simple index view that maps to the index route.

index.html

    <template></template>

index.ts
 
    export class Index { }

### Run your application

    npm install
    au build
    au run

# Demo Projects

The demos have an example of how to configure everything. 

### Smaller Demo(s)

https://github.com/shaunluttin/aurelia-open-id-connect-demos

### Large Demo

See it LIVE here: https://zamboni-app.azurewebsites.net

Or, clone and run it locally:

    git clone https://github.com/shaunluttin/aurelia-open-id-connect.git
    cd aurelia-open-id-connect/demo
    git checkout 0.11.2
    npm install -y
    npm run demo

Note: a complete demo requires the following running locally:

* an OpenId Connect authorization server at http://localhost:5000
* a Resource Server at http://localhost:5001
* another Resource Server at http://localhost:5002

Find examples of those here:

    git clone https://github.com/openiddict/openiddict-samples.git
    cd openiddict-samples/samples/ImplicitFlow

# Implicit Flow Implementor Guide

The [OpenID Connect Implicit Client Implementer's Guide 1.0][1] contains a subset of the OpenID Connect Core 1.0 specification.

It is designed to be easy to read and implement for basic Web-based Relying Parties using the OAuth 2.0 Implicit Flow.

[0]: https://github.com/shaunluttin/aurelia-open-id-connect/releases
[1]: http://openid.net/specs/openid-connect-implicit-1_0.html
[alpha-software]: https://blog.codinghorror.com/alpha-beta-and-sometimes-gamma/
[aurelia-cli]: https://www.npmjs.com/package/aurelia-cli
