# Alpha

If the install doesn't work, try an [earlier or later release][0]. `0.11.2` is apparently reliable across machines.

Alternatively, open a GitHub issue.

# Installation

    npm install --save shaunluttin/aurelia-open-id-connect#0.11.2
    
    jspm install github:shaunluttin/aurelia-open-id-connect@0.11.2

We recommend `npm install` instead of `jspm install`. 

Add the following two dependencies to aurelia.json.

```
{
  "name": "aurelia-open-id-connect",
  "path": "../node_modules/aurelia-open-id-connect/dist/amd",
  "main": "index"
},
"oidc-client"
```

Also in aurelia.json, set `build.loader.plugs.stub = false` (to load plugin HTML). If that does not work, try `true`.

Create an `open-id-connect-configuration.ts` file in your project's root (the name and location are arbitrary).

In `main.ts` add the plugin, referencing the configuration.

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

* an OpenId Connect authorization server at http://localhost:12345    
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

