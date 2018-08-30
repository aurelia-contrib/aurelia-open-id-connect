import { User } from 'oidc-client';
import OpenIdConnect from './open-id-connect';
export default class  {
    protected openIdConnect: OpenIdConnect;
    user: User | null;
    readonly isLoggedIn: boolean;
    constructor(openIdConnect: OpenIdConnect);
    attached(): Promise<void>;
    login(): void;
    logout(): void;
}
