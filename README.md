# Why?

This plugin adapts `oidc-client-js` to the Aurelia router. While it is possible to use the `oidc-client-js` on its own, you will find yourself writing a fair amount of code to handle the routing within Aurelia.

# Demo Projects

The demos have an example of how to configure everything. 

### Smaller Demo(s) <- more up-to-date

https://github.com/aurelia-contrib/aurelia-open-id-connect-demos

### Larger, LIVE Demo

https://zamboni-app.azurewebsites.net

# Installation 

    yarn add aurelia-open-id-connect --save
    npm install aurelia-open-id-connect --save

# Implicit Flow Implementor Guide

The [OpenID Connect Implicit Client Implementer's Guide 1.0][1] contains a subset of the OpenID Connect Core 1.0 specification.

It is designed to be easy to read and implement for basic Web-based Relying Parties using the OAuth 2.0 Implicit Flow.

[0]: https://github.com/aurelia-contrib/aurelia-open-id-connect/releases
[1]: http://openid.net/specs/openid-connect-implicit-1_0.html
[alpha-software]: https://blog.codinghorror.com/alpha-beta-and-sometimes-gamma/
[aurelia-cli]: https://www.npmjs.com/package/aurelia-cli
