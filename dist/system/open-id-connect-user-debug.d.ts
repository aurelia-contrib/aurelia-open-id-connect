import { OpenIdConnectUserBlock } from './open-id-connect-user-block';
export declare class OpenIdConnectUserDebug extends OpenIdConnectUserBlock {
    loginSilent(): Promise<void>;
    readonly stringifiedUser: string;
}
