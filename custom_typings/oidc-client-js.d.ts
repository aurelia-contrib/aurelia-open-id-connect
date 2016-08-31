declare module "oidc-client" {


    export class AccessTokenEvents {
        constructor({accessTokenExpiringNotificationTime, accessTokenExpiringTimer, accessTokenExpiredTimer}?: {
            accessTokenExpiringNotificationTime?: number;
            accessTokenExpiringTimer?: Timer;
            accessTokenExpiredTimer?: Timer;
        });
        load(container: any): void;
        unload(): void;
        _cancelTimers(): void;
        addAccessTokenExpiring(cb: any): void;
        removeAccessTokenExpiring(cb: any): void;
        addAccessTokenExpired(cb: any): void;
        removeAccessTokenExpired(cb: any): void;
    }
    export class CheckSessionIFrame {
        constructor(callback: any, client_id: any, url: any, interval: any);
        _message(e: any): void;
        start(session_state: any): void;
        stop(): void;
    }
    export class CordovaIFrameNavigator {
        prepare(params: any): any;
    }
    export class CordovaPopupNavigator {
        prepare(params: any): any;
    }
    export class CordovaPopupWindow {
        constructor(params: any);
        _isInAppBrowserInstalled(cordovaMetadata: any): boolean;
        navigate(params: any): any;
        promise: any;
        _loadStartCallback(event: any): void;
        _exitCallback(message: any): void;
        _success(data: any): void;
        _error(message: any): void;
        _cleanup(): void;
    }
    export class ErrorResponse extends Error {
        constructor({error, error_description, error_uri, state}?: {
            error: any;
            error_description: any;
            error_uri: any;
            state: any;
        });
    }
    export class Event {
        constructor(name: any);
        addHandler(cb: any): void;
        removeHandler(cb: any): void;
        raise(...params: any[]): void;
    }
    export class Global {
        static _testing(): void;
        static location: Location;
        static localStorage: Storage;
        static sessionStorage: Storage;
        static XMLHttpRequest: {
            new (): XMLHttpRequest;
            prototype: XMLHttpRequest;
            DONE: number;
            HEADERS_RECEIVED: number;
            LOADING: number;
            OPENED: number;
            UNSENT: number;
            create(): XMLHttpRequest;
        };
        static timer: {
            setTimeout: (cb: any, duration: any) => number;
            clearTimeout: (handle: any) => void;
        };
    }
    export class IFrameNavigator {
        prepare(params: any): any;
        callback(url: any): any;
    }
    export class IFrameWindow {
        constructor(params: any);
        navigate(params: any): any;
        promise: any;
        _success(data: any): void;
        _error(message: any): void;
        _cleanup(): void;
        _timeout(): void;
        _message(e: any): void;
        _origin: string;
        static notifyParent(url: any): void;
    }
    export class InMemoryWebStorage {
        constructor();
        getItem(key: any): any;
        setItem(key: any, value: any): void;
        removeItem(key: any): void;
        length: number;
        key(index: any): string;
    }
    export class JoseUtil {
        static parseJwt(jwt: any): {
            header: any;
            payload: any;
        };
        static validateJwt(jwt: any, key: any, issuer: any, audience: any, clockSkew: any, now: any): any;
        static _validateJwt(jwt: any, key: any, issuer: any, audience: any, clockSkew: any, now: any): any;
        static hashString(value: any, alg: any): any;
        static hexToBase64Url(value: any): any;
    }
    export class JsonService {
        constructor(XMLHttpRequestCtor?: {
            new (): XMLHttpRequest;
            prototype: XMLHttpRequest;
            DONE: number;
            HEADERS_RECEIVED: number;
            LOADING: number;
            OPENED: number;
            UNSENT: number;
            create(): XMLHttpRequest;
        });
        getJson(url: any, token: any): any;
    }
    export class Log {
        static NONE: number;
        static ERROR: number;
        static WARN: number;
        static INFO: number;
        static reset(): void;
        static level: any;
        static logger: any;
        static info(...args: any[]): void;
        static warn(...args: any[]): void;
        static error(...args: any[]): void;
    }
    export class MetadataService {
        constructor(settings: any, JsonServiceCtor?: typeof JsonService);
        getMetadata(): any;
        getIssuer(): any;
        getAuthorizationEndpoint(): any;
        getUserInfoEndpoint(): any;
        getCheckSessionIframe(): any;
        getEndSessionEndpoint(): any;
        _getMetadataProperty(name: any, optional?: boolean): any;
        getSigningKeys(): any;
        _filterSigningKeys(keys: any): any;
    }
    export class OidcClient {
        constructor(settings?: {});
        _stateStore: any;
        _validator: any;
        _metadataService: any;
        settings: any;
        metadataService: any;
        createSigninRequest({response_type, scope, redirect_uri, data, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values}: {
            response_type: any;
            scope: any;
            redirect_uri: any;
            data: any;
            prompt: any;
            display: any;
            max_age: any;
            ui_locales: any;
            id_token_hint: any;
            login_hint: any;
            acr_values: any;
        }, stateStore: any): any;
        processSigninResponse(url: any, stateStore: any): any;
        createSignoutRequest({id_token_hint, data, post_logout_redirect_uri}: {
            id_token_hint: any;
            data: any;
            post_logout_redirect_uri: any;
        }, stateStore: any): any;
        processSignoutResponse(url: any, stateStore: any): any;
        clearStaleState(stateStore: any): any;
    }
    export class OidcClientSettings {
        constructor({authority, metadataUrl, metadata, signingKeys, client_id, response_type, scope, redirect_uri, post_logout_redirect_uri, prompt, display, max_age, ui_locales, acr_values, filterProtocolClaims, loadUserInfo, staleStateAge, clockSkew, stateStore, ResponseValidatorCtor, MetadataServiceCtor}?: {
            authority: any;
            metadataUrl: any;
            metadata: any;
            signingKeys: any;
            client_id: any;
            response_type?: string;
            scope?: string;
            redirect_uri: any;
            post_logout_redirect_uri: any;
            prompt: any;
            display: any;
            max_age: any;
            ui_locales: any;
            acr_values: any;
            filterProtocolClaims?: boolean;
            loadUserInfo?: boolean;
            staleStateAge?: number;
            clockSkew?: number;
            stateStore?: WebStorageStateStore;
            ResponseValidatorCtor?: typeof ResponseValidator;
            MetadataServiceCtor?: typeof MetadataService;
        });
        client_id: any;
        response_type: any;
        scope: any;
        redirect_uri: any;
        post_logout_redirect_uri: any;
        prompt: any;
        display: any;
        max_age: any;
        ui_locales: any;
        acr_values: any;
        authority: any;
        metadataUrl: any;
        metadata: any;
        signingKeys: any;
        filterProtocolClaims: any;
        loadUserInfo: any;
        staleStateAge: any;
        clockSkew: any;
        stateStore: any;
        validator: any;
        metadataService: any;
    }
    export class PopupNavigator {
        prepare(params: any): any;
        callback(url: any): any;
    }
    export class PopupWindow {
        constructor(params: any);
        navigate(params: any): any;
        promise: any;
        _success(data: any): void;
        _error(message: any): void;
        _cleanup(): void;
        _checkForPopupClosed(): void;
        _message(e: any): void;
        _origin: string;
        static notifyOpener(url: any): void;
    }
    export function random(): string;
    export class RedirectNavigator {
        prepare(): any;
        navigate(params: any): any;
        url: string;
    }
    export class ResponseValidator {
        constructor(settings: any, MetadataServiceCtor?: typeof MetadataService, UserInfoServiceCtor?: typeof UserInfoService, joseUtil?: typeof JoseUtil);
        validateSigninResponse(state: any, response: any): any;
        validateSignoutResponse(state: any, response: any): any;
        _processSigninParams(state: any, response: any): any;
        _processClaims(response: any): any;
        _mergeClaims(claims1: any, claims2: any): any;
        _filterProtocolClaims(claims: any): any;
        _validateTokens(state: any, response: any): any;
        _validateIdTokenAndAccessToken(state: any, response: any): any;
        _validateIdToken(state: any, response: any): any;
        _validateAccessToken(response: any): any;
    }
    export class SessionMonitor {
        constructor(userManager: any, CheckSessionIFrameCtor?: typeof CheckSessionIFrame);
        _settings: any;
        _metadataService: any;
        _client_id: any;
        _checkSessionInterval: any;
        _start(user: any): void;
        _stop(): void;
        _callback(): void;
    }
    export class SigninRequest {
        constructor({url, client_id, redirect_uri, response_type, scope, authority, data, prompt, display, max_age, ui_locales, id_token_hint, login_hint, acr_values}: {
            url: any;
            client_id: any;
            redirect_uri: any;
            response_type: any;
            scope: any;
            authority: any;
            data: any;
            prompt: any;
            display: any;
            max_age: any;
            ui_locales: any;
            id_token_hint: any;
            login_hint: any;
            acr_values: any;
        });
        static isOidc(response_type: any): boolean;
        static isOAuth(response_type: any): boolean;
    }
    export class SigninResponse {
        constructor(url: any);
        expires_in: number;
        expired: boolean;
        scopes: any;
        isOpenIdConnect: boolean;
    }
    export class SigninState extends State {
        constructor({nonce, authority, client_id}?: {
            nonce: any;
            authority: any;
            client_id: any;
        });
        nonce: any;
        authority: any;
        client_id: any;
        toStorageString(): string;
        static fromStorageString(storageString: any): SigninState;
    }
    export class SignoutRequest {
        constructor({url, id_token_hint, post_logout_redirect_uri, data}: {
            url: any;
            id_token_hint: any;
            post_logout_redirect_uri: any;
            data: any;
        });
    }
    export class SignoutResponse {
        constructor(url: any);
    }
    export class SilentRenewService {
        constructor(userManager: any);
        _tokenExpiring(): void;
    }
    export class State {
        constructor({id, data, created}?: {
            id: any;
            data: any;
            created: any;
        });
        id: any;
        data: any;
        created: any;
        toStorageString(): string;
        static fromStorageString(storageString: any): State;
        static clearStaleState(storage: any, age: any): any;
    }
    export class Timer extends Event {
        constructor(name: any, timer?: {
            setTimeout: (cb: any, duration: any) => number;
            clearTimeout: (handle: any) => void;
        });
        init(duration: any): void;
        cancel(): void;
        _callback(): void;
    }
    export class UrlUtility {
        static addQueryParam(url: any, name: any, value: any): any;
        static parseUrlFragment(value: any, delimiter?: string, global?: typeof Global): {
            error: string;
        } | {};
    }
    export class User {

        id_token: any;
        session_state: any;
        access_token: any;
        token_type: any;
        scope: any;
        profile: any;
        expires_at: any;
        state: any;

        constructor({id_token, session_state, access_token, token_type, scope, profile, expires_at, state}: {
            id_token: any;
            session_state: any;
            access_token: any;
            token_type: any;
            scope: any;
            profile: any;
            expires_at: any;
            state: any;
        });
        expires_in: number;
        expired: boolean;
        scopes: any;
        toStorageString(): string;
        static fromStorageString(storageString: any): User;
    }
    export class UserInfoService {
        constructor(settings: any, JsonServiceCtor?: typeof JsonService, MetadataServiceCtor?: typeof MetadataService);
        getClaims(token: any): any;
    }
    export class UserManager extends OidcClient {
        constructor(settings?: {}, SilentRenewServiceCtor?: typeof SilentRenewService, SessionMonitorCtor?: typeof SessionMonitor);
        _redirectNavigator: any;
        _popupNavigator: any;
        _iframeNavigator: any;
        _userStore: any;
        events: any;
        getUser(): any;
        removeUser(): any;
        signinPopup(args?: {}): any;
        signinPopupCallback(url: any): any;
        signinSilent(args?: {}): any;
        signinSilentCallback(url: any): any;
        querySessionStatus(args?: {}): any;
        _signin(args: any, navigator: any, navigatorParams?: {}): any;
        _signinCallback(url: any, navigator: any): any;
        _signout(args: any, navigator: any, navigatorParams?: {}): any;
        _signoutCallback(url: any, navigator: any): any;
        signinRedirect(args: any): any;
        signinRedirectCallback(url: any): any;
        signoutRedirect(args: any): any;
        signoutPopup(args?: {}): any;
        signoutRedirectCallback(url: any): any;
        _signinStart(args: any, navigator: any, navigatorParams?: {}): any;
        _signinEnd(url: any): any;
        _signoutStart(args: {}, navigator: any, navigatorParams?: {}): any;
        _signoutEnd(url: any): any;
        _userStoreKey: string;
        _loadUser(): any;
        _storeUser(user: any): any;
    }
    export class UserManagerEvents extends AccessTokenEvents {
        constructor(settings: any);
        load(user: any, raiseEvent?: boolean): void;
        unload(): void;
        addUserLoaded(cb: any): void;
        removeUserLoaded(cb: any): void;
        addUserUnloaded(cb: any): void;
        removeUserUnloaded(cb: any): void;
        addSilentRenewError(cb: any): void;
        removeSilentRenewError(cb: any): void;
        _raiseSilentRenewError(e: any): void;
        addUserSignedOut(cb: any): void;
        removeUserSignedOut(cb: any): void;
        _raiseUserSignedOut(e: any): void;
    }
    export class UserManagerSettings extends OidcClientSettings {
        constructor({popup_redirect_uri, popupWindowFeatures, popupWindowTarget, silent_redirect_uri, silentRequestTimeout, automaticSilentRenew, monitorSession, accessTokenExpiringNotificationTime, redirectNavigator, popupNavigator, iframeNavigator, userStore}?: {
            popup_redirect_uri: any;
            popupWindowFeatures: any;
            popupWindowTarget: any;
            silent_redirect_uri: any;
            silentRequestTimeout: any;
            automaticSilentRenew?: boolean;
            monitorSession?: boolean;
            accessTokenExpiringNotificationTime?: number;
            redirectNavigator?: RedirectNavigator;
            popupNavigator?: PopupNavigator;
            iframeNavigator?: IFrameNavigator;
            userStore?: WebStorageStateStore;
        });
        popup_redirect_uri: any;
        popupWindowFeatures: any;
        popupWindowTarget: any;
        silent_redirect_uri: any;
        silentRequestTimeout: any;
        automaticSilentRenew: boolean;
        accessTokenExpiringNotificationTime: any;
        monitorSession: any;
        redirectNavigator: any;
        popupNavigator: any;
        iframeNavigator: any;
        userStore: any;
    }
    export class WebStorageStateStore {
        constructor({prefix, store}?: {
            prefix?: string;
            store?: Storage;
        });
        set(key: any, value: any): any;
        get(key: any): any;
        remove(key: any): any;
        getAllKeys(): any;
    }

}
