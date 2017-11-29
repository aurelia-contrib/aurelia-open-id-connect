import { UserManager } from 'oidc-client';
import { OpenIdConnectLogger } from './open-id-connect-logger';

export type RedirectHandler = (userManager: UserManager, logger: OpenIdConnectLogger) => Promise<any>;
