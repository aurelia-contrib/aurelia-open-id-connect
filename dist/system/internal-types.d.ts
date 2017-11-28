import { User } from 'oidc-client';
export declare type UserManagerEventHandler = (...ev: any[]) => void;
export declare type UserManagerEventsAction = (a: UserManagerEventHandler | User) => void;
