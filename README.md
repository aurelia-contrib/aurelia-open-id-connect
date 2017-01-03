# Install 

    npm install --save shaunluttin/aurelia-open-id-connect#0.9.0
    
    jspm install github:shaunluttin/aurelia-open-id-connect@0.9.0

# Implicit Flow Implementor Guide

The OpenID Connect Implicit Client Implementer's Guide 1.0 contains a subset of the OpenID Connect Core 1.0 specification. 

It is designed to be easy to read and implement for basic Web-based Relying Parties using the OAuth 2.0 Implicit Flow.

http://openid.net/specs/openid-connect-implicit-1_0.html

# Clone and Demo 
   
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

# Usage (in progress)

See the demo project for a usage example. Here are some gotchas.

Add the following two dependencies in aurelia.json to use the package.

```
{
  "name": "aurelia-open-id-connect",
  "path": "../node_modules/aurelia-open-id-connect/dist/amd",
  "main": "index"
},
"oidc-client"
```

Set `build.loader.plugs.stub = false` in aurelia.json to load HTML from the package.
