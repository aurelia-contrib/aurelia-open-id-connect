import OpenIdConnectUserBlock from './open-id-connect-user-block';
export default class  extends OpenIdConnectUserBlock {
    loginSilent(): Promise<void>;
    readonly stringifiedUser: string;
}
