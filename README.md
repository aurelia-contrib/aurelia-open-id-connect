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

Install from GitHub.

    npm install --save shaunluttin/aurelia-open-id-connect

Also install UNMET PEER DEPENDENCIES such as `babel-polyfill`.

### Add aurelia-open-id-connect to Aurelia

We use the Aurelia CLI, so we add the following to `aurelia.json`.

    {
       "name": "aurelia-open-id-connect",
       "path": "../node_modules/aurelia-open-id-connect/dist/amd",
       "main": "index"
    },
    "oidc-client"

**Also** set `build.loader.plugins.stub = false` to load the plugin's HTML.

### Configure the OpenID Connect client

Create a `src/open-id-connect-configuration.ts` file that specifies the Open ID Connect configuration. There is an [example here](/open-id-connect-configuration.ts.example).

In your `src/main.ts`, import the configuration file, add the plugin, and invoke the callback, passing it the imported configuration. 

    import oidcConfig from "./open-id-connect-configuration";

    aurelia.use
       .plugin("aurelia-open-id-connect", (callback) => callback(oidcConfig));

### Add the user-block

We add the `user-block` to the app.html view.

    <template>
      <h1>${message}</h1>
      <open-id-connect-user-block></open-id-connect-user-block>
    </template>

### Configure routing

Configure routing in the app.ts file.

TODO: Detail how to do this.

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

# Publish

    npm run package
    npm version patch -m "Some message"
    npm login
    npm publish

# Implicit Flow Implementor Guide

The [OpenID Connect Implicit Client Implementer's Guide 1.0][1] contains a subset of the OpenID Connect Core 1.0 specification.

It is designed to be easy to read and implement for basic Web-based Relying Parties using the OAuth 2.0 Implicit Flow.

[0]: https://github.com/shaunluttin/aurelia-open-id-connect/releases
[1]: http://openid.net/specs/openid-connect-implicit-1_0.html
[alpha-software]: https://blog.codinghorror.com/alpha-beta-and-sometimes-gamma/
[aurelia-cli]: https://www.npmjs.com/package/aurelia-cli
