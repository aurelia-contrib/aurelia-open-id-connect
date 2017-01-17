import { NavModel } from "aurelia-router";
import { User } from "oidc-client";
export default class OpenIdConnectRoleFilterValueConverter {
    toView(navigation: NavModel[], user: User): NavModel[];
}
