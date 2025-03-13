import { Agent } from 'http';
import { Headers, BodyInit } from 'node-fetch';

type SerializedType = Buffer | ArrayBuffer | ArrayBufferView | string;
interface Coding {
    encode(data: any): SerializedType;
    decode(data: SerializedType): any;
}
declare class Json {
    static encode(data: any): string;
    static decode(data: SerializedType): any;
}
declare class Yaml {
    static encode(data: any): string;
    static decode(data: SerializedType): any;
}

interface KV<T = string> {
    [key: string]: T;
}
declare const KV: {
    fromMap<T>(map: Map<string, T>): KV<T>;
    toMap<T>(kv: KV<T>): Map<string, T>;
    entries<T>(kv: KV<T> | Map<string, T>): MapIterator<[string, T]>;
};

declare const Cookie: {
    parse(cookies: string): KV;
    stringify(cookies: KV): string;
};

interface ErrorInfo {
    simpleMessage?: string;
    error?: any;
}
declare class GenericError extends Error {
    simpleMessage?: string;
    constructor(arg?: any, defaultSimpleMessage?: string);
    userFriendlyMessage(): string;
}
declare class NetworkError extends GenericError {
    constructor(arg?: any);
}
declare class HttpError extends GenericError {
    constructor(arg?: any, defaultSimpleMessage?: string);
}
declare class ClientError extends HttpError {
}
declare class ServerError extends HttpError {
}
declare class InternalServerError extends ServerError {
}
declare class ApiError extends HttpError {
}
declare class ParseError extends GenericError {
    constructor(arg?: any);
}
declare class SerializeError extends GenericError {
    constructor(arg?: any);
}
declare class InternalError extends GenericError {
    constructor(arg?: any);
}
declare class NotFoundError extends GenericError {
    constructor(arg?: any);
}
declare class InvalidArgumentError extends GenericError {
    constructor(arg?: any);
}
declare class UnimplementedError extends GenericError {
    constructor(arg?: any);
}
declare class UnsupportedError extends GenericError {
    constructor(arg?: any);
}
declare class PermissionDeniedError extends GenericError {
    constructor(arg?: any);
}
declare class RateLimitedError extends GenericError {
    constructor(arg?: any);
}
declare class UnavailableError extends GenericError {
    constructor(arg?: any);
}
declare class TimedOutError extends GenericError {
    constructor(arg?: any);
}
declare class PreconditionFailedError extends GenericError {
    constructor(arg?: any);
}
declare class AbortedError extends GenericError {
    constructor(arg?: any);
}
declare class ExistsError extends GenericError {
    constructor(arg?: any);
}
declare class Errors {
    static toString(e: unknown): string;
}

declare enum HttpMethod {
    GET = "GET",
    HEAD = "HEAD",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    CONNECT = "CONNECT",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE",
    PATCH = "PATCH"
}
declare enum HttpHeader {
    CONTENT_TYPE = "Content-Type",
    AUTHORIZATION = "Authorization",
    COOKIE = "Cookie",
    SET_COOKIE = "Set-Cookie",
    ORIGIN = "Origin",
    USER_AGENT = "User-Agent",
    CONTENT_LENGTH = "Content-Length",
    DATE = "Date",
    REFERRER = "Referer"
}
declare enum HttpContentType {
    JSON = "application/json",
    URLFORM = "application/x-www-form-urlencoded",
    PROTOBUF = "application/x-protobuf",
    OCTET_STREAM = "application/octet-stream",
    TEXT = "text/plain",
    PROTOBUFFER = "application/x-protobuffer"
}

interface Mime {
    type: string;
    subtype: string;
    params: KV;
}
declare const Mime: {
    parse(str: string): Mime;
    typeEquals(a: string | Mime, b: string | Mime): boolean;
};

declare class Promises {
    static resolveAfter(delay: number): Promise<void>;
    static rejectAfter(delay: number): Promise<void>;
}
declare class ConcurrentPromise<T> {
    task: () => Promise<T>;
    options: {
        abortOnFail?: true;
        queueRun?: true;
    } | undefined;
    promise?: Promise<T>;
    error?: any;
    queued: boolean;
    constructor(task: () => Promise<T>, options?: {
        abortOnFail?: true;
        queueRun?: true;
    });
    private taskOnce;
    run(): Promise<T>;
    clear(): void;
}

interface Response {
    status: number;
    statusText: string;
    ok: boolean;
    headers: Headers;
    url: string;
    redirected: boolean;
    body: Buffer;
}
type Payload = BodyInit | Uint8Array;
declare class Request {
    method: string;
    headers?: KV<any>;
    body?: Payload;
    agent?: Agent;
    constructor();
    setMethod(method: string): void;
    setHeader(key: string, value: any): this;
    setHeaders(headers: KV<any> | Map<string, any>): this;
    setAgent(agent: Agent): void;
    post(body: Payload, contentType?: HttpContentType): this;
    postForm(form: string | KV<any> | URLSearchParams): this;
    postJSON(form: any): this;
    postProtobuf(body: Payload): this;
    postBinary(body: Payload): this;
    execute(url: string): Promise<Response>;
}

declare class Timer {
    initial?: number;
    repeat?: number;
    callback?: Function;
    callbackArgs?: any[];
    timer?: NodeJS.Timeout;
    expire?: number;
    inCallback: boolean;
    isRepeat: boolean;
    constructor(options: {
        initialTimeout?: number;
        repeatTimeout?: number;
        start?: boolean;
    }, callback?: Function, callbackArgs?: any);
    private invokeCallback;
    private internalStart;
    start(time?: number, repeat?: number): void;
    stop(): void;
    get active(): boolean;
}

declare const URLParams: {
    fromKV(kv: KV<any>): URLSearchParams;
    toKV(params: URLSearchParams | string): KV<any>;
    toString(params: string | KV<any> | URLSearchParams): string;
};
declare class URLBuilder {
    scheme: string;
    host?: string;
    path_: string[];
    params_?: KV<any>;
    fragment?: string;
    constructor(url?: string);
    setScheme(scheme: string): this;
    setHost(host: string): this;
    setPath(path: string): void;
    addPath(path: string): void;
    setParam(key: string, value: any): this;
    setParams(kv: string | KV<any> | Map<string, any>): this;
    setFragment(fragment: string): this;
    get origin(): string;
    get path(): string;
    get href(): string;
    build(): string;
}

export { AbortedError, ApiError, ClientError, type Coding, ConcurrentPromise, Cookie, type ErrorInfo, Errors, ExistsError, GenericError, HttpContentType, HttpError, HttpHeader, HttpMethod, InternalError, InternalServerError, InvalidArgumentError, Json, KV, Mime, NetworkError, NotFoundError, ParseError, type Payload, PermissionDeniedError, PreconditionFailedError, Promises, RateLimitedError, Request, type Response, SerializeError, type SerializedType, ServerError, TimedOutError, Timer, URLBuilder, URLParams, UnavailableError, UnimplementedError, UnsupportedError, Yaml };
