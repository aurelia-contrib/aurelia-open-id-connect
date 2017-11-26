import { FrameworkConfiguration } from "aurelia-framework";
import OpenIdConnectConfiguration from "./open-id-connect-configuration";
import OpenIdConnectFactory from "./open-id-connect-factory";
export interface CallbackV19 extends Function {
    (): OpenIdConnectConfiguration;
}
export interface CallbackV18 extends Function {
    (config: OpenIdConnectConfiguration): void;
}
export declare type PluginCallback = CallbackV18 | CallbackV19;
export default function (frameworkConfig: FrameworkConfiguration, callback?: PluginCallback, factory?: OpenIdConnectFactory): void;
