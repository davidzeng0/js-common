export interface ErrorInfo {
    simpleMessage?: string;
    error?: any;
}
export declare class GenericError extends Error {
    simpleMessage?: string;
    constructor(arg?: any, defaultSimpleMessage?: string);
    userFriendlyMessage(): string;
}
export declare class NetworkError extends GenericError {
    constructor(arg?: any);
}
export declare class HttpError extends GenericError {
    constructor(arg?: any, defaultSimpleMessage?: string);
}
export declare class ClientError extends HttpError {
}
export declare class ServerError extends HttpError {
}
export declare class InternalServerError extends ServerError {
}
export declare class ApiError extends HttpError {
}
export declare class ParseError extends GenericError {
    constructor(arg?: any);
}
export declare class SerializeError extends GenericError {
    constructor(arg?: any);
}
export declare class InternalError extends GenericError {
    constructor(arg?: any);
}
export declare class NotFoundError extends GenericError {
    constructor(arg?: any);
}
export declare class InvalidArgumentError extends GenericError {
    constructor(arg?: any);
}
export declare class UnimplementedError extends GenericError {
    constructor(arg?: any);
}
export declare class UnsupportedError extends GenericError {
    constructor(arg?: any);
}
export declare class PermissionDeniedError extends GenericError {
    constructor(arg?: any);
}
export declare class RateLimitedError extends GenericError {
    constructor(arg?: any);
}
export declare class UnavailableError extends GenericError {
    constructor(arg?: any);
}
export declare class TimedOutError extends GenericError {
    constructor(arg?: any);
}
export declare class PreconditionFailedError extends GenericError {
    constructor(arg?: any);
}
export declare class AbortedError extends GenericError {
    constructor(arg?: any);
}
export declare class ExistsError extends GenericError {
    constructor(arg?: any);
}
