import { NavModel } from "aurelia-router";
import { User } from "oidc-client";
export declare class OpenIdConnectRoleFilterValueConverter {
    toView(navigation: NavModel[], user: User): NavModel[];
}
