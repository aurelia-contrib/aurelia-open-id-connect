import { User } from "oidc-client";
export default interface OpenIdConnectUserObserver {
    userChanged(user: User): void;
}
