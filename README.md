# Why?

This plugin adapts `oidc-client-js` to the Aurelia router. While it possible to use the `oidc-client-js` on its own, you will find yourself writing a fair amount of code to handling the routing within Aurelia.

# Alpha

If the install doesn't work, try an [earlier or later release][0]. `0.11.2` is apparently reliable across machines. Alternatively, open a GitHub issue.

# Installation

Install the plugin. We recommend `npm install` instead of `jspm install`.

    npm install --save shaunluttin/aurelia-open-id-connect#0.11.2

    jspm install github:shaunluttin/aurelia-open-id-connect@0.11.2

Now make the following changes to `aurelia.json`. Add the following dependencies:

```
{
  "name": "aurelia-open-id-connect",
  "path": "../node_modules/aurelia-open-id-connect/dist/amd",
  "main": "index"
},
"oidc-client"
```

And set `build.loader.plugs.stub = false` in order to load plugin HTML. If that does not work, try `true`.

Now, create an `open-id-connect-configuration.ts` file in your project's root (the name and location are arbitrary). There is an example here: https://github.com/shaunluttin/aurelia-open-id-connect/blob/master/demo/src/open-id-connect-configuration.ts

Then in `main.ts` add the plugin, referencing the configuration.

    import oidcConfig from "./open-id-connect-configuration";

    .plugin("aurelia-open-id-connect", (callback) => callback(oidcConfig));

See the demo project for a usage example.

# Demo Project

    git clone https://github.com/shaunluttin/aurelia-open-id-connect.git
    cd aurelia-open-id-connect/demo
    git checkout 0.11.2
    npm install -y
    npm run demo

A complete demo requres the following running locally:

* an OpenId Connect authorization server at http://localhost:5000
* a Resource Server at http://localhost:5001
* another Resource Server at http://localhost:5002

Find examples of those here:

    git clone https://github.com/openiddict/openiddict-samples.git
    cd openiddict-samples/samples/ImplicitFlow

# Clone and Publish

    npm run publish

# Implicit Flow Implementor Guide

The [OpenID Connect Implicit Client Implementer's Guide 1.0][1] contains a subset of the OpenID Connect Core 1.0 specification.

It is designed to be easy to read and implement for basic Web-based Relying Parties using the OAuth 2.0 Implicit Flow.


[0]: https://github.com/shaunluttin/aurelia-open-id-connect/releases
[1]: http://openid.net/specs/openid-connect-implicit-1_0.html

