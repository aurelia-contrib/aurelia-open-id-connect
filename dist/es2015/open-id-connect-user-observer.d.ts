import { User } from 'oidc-client';
export interface OpenIdConnectUserObserver {
    userChanged(user: User): void;
}
