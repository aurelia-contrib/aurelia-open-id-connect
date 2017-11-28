import { User } from 'oidc-client';
import { OpenIdConnect } from './open-id-connect';
export declare class OpenIdConnectUserBlock {
    protected openIdConnect: OpenIdConnect;
    protected user: User | null;
    readonly isLoggedIn: boolean;
    constructor(openIdConnect: OpenIdConnect);
    attached(): Promise<void>;
    login(): void;
    logout(): void;
}
