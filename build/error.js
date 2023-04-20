"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistsError = exports.AbortedError = exports.PreconditionFailedError = exports.TimedOutError = exports.UnavailableError = exports.RateLimitedError = exports.PermissionDeniedError = exports.UnsupportedError = exports.UnimplementedError = exports.InvalidArgumentError = exports.NotFoundError = exports.InternalError = exports.SerializeError = exports.ParseError = exports.ApiError = exports.InternalServerError = exports.ServerError = exports.ClientError = exports.HttpError = exports.NetworkError = exports.GenericError = void 0;
class GenericError extends Error {
    simpleMessage;
    constructor(arg, defaultSimpleMessage) {
        if (arg instanceof Error) {
            super(arg.message);
            this.name = this.constructor.name;
            this.simpleMessage = defaultSimpleMessage;
            return;
        }
        if (typeof arg != 'object') {
            if (arg !== undefined)
                arg = arg.toString();
            super(arg);
            this.name = this.constructor.name;
            this.simpleMessage = defaultSimpleMessage;
            return;
        }
        var info = arg ?? {};
        var simpleMessage = info.simpleMessage ?? defaultSimpleMessage;
        if (info.error instanceof Error)
            super(info.error.message);
        else
            super(info.error ?? simpleMessage);
        this.name = this.constructor.name;
        this.simpleMessage = simpleMessage;
    }
    userFriendlyMessage() {
        return this.simpleMessage ?? 'Unknown error';
    }
}
exports.GenericError = GenericError;
class NetworkError extends GenericError {
    constructor(arg) {
        super(arg, 'Network error');
    }
}
exports.NetworkError = NetworkError;
class HttpError extends GenericError {
    constructor(arg, defaultSimpleMessage = 'Error communicating with server') {
        super(arg, defaultSimpleMessage);
    }
}
exports.HttpError = HttpError;
class ClientError extends HttpError {
}
exports.ClientError = ClientError;
class ServerError extends HttpError {
}
exports.ServerError = ServerError;
class InternalServerError extends ServerError {
}
exports.InternalServerError = InternalServerError;
class ApiError extends HttpError {
}
exports.ApiError = ApiError;
class ParseError extends GenericError {
    constructor(arg) {
        super(arg, 'Error processing input');
    }
}
exports.ParseError = ParseError;
class SerializeError extends GenericError {
    constructor(arg) {
        super(arg, 'Error serializing input');
    }
}
exports.SerializeError = SerializeError;
class InternalError extends GenericError {
    constructor(arg) {
        super(arg, 'Internal error');
    }
}
exports.InternalError = InternalError;
class NotFoundError extends GenericError {
    constructor(arg) {
        super(arg, 'Resource not found');
    }
}
exports.NotFoundError = NotFoundError;
class InvalidArgumentError extends GenericError {
    constructor(arg) {
        super(arg, 'Invalid argument');
    }
}
exports.InvalidArgumentError = InvalidArgumentError;
class UnimplementedError extends GenericError {
    constructor(arg) {
        super(arg, 'Function not implemented');
    }
}
exports.UnimplementedError = UnimplementedError;
class UnsupportedError extends GenericError {
    constructor(arg) {
        super(arg, 'Function not supported');
    }
}
exports.UnsupportedError = UnsupportedError;
class PermissionDeniedError extends GenericError {
    constructor(arg) {
        super(arg, 'Permission denied');
    }
}
exports.PermissionDeniedError = PermissionDeniedError;
class RateLimitedError extends GenericError {
    constructor(arg) {
        super(arg, 'Rate limited');
    }
}
exports.RateLimitedError = RateLimitedError;
class UnavailableError extends GenericError {
    constructor(arg) {
        super(arg, 'Resource unavailable, try again later');
    }
}
exports.UnavailableError = UnavailableError;
class TimedOutError extends GenericError {
    constructor(arg) {
        super(arg, 'Operation timed out');
    }
}
exports.TimedOutError = TimedOutError;
class PreconditionFailedError extends GenericError {
    constructor(arg) {
        super(arg, 'Precondition failed');
    }
}
exports.PreconditionFailedError = PreconditionFailedError;
class AbortedError extends GenericError {
    constructor(arg) {
        super(arg, 'Operation cancelled');
    }
}
exports.AbortedError = AbortedError;
class ExistsError extends GenericError {
    constructor(arg) {
        super(arg, 'Resource exists');
    }
}
exports.ExistsError = ExistsError;
