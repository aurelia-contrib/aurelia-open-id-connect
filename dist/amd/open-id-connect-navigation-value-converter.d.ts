import { NavModel } from "aurelia-router";
import { User } from "oidc-client";
export declare class OpenIdConnectNavigationValueConverter {
    toView(navigation: NavModel[], user: User): NavModel[];
}
