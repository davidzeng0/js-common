export interface ErrorInfo{
	simpleMessage?: string;
	error?: any;
}

export class GenericError extends Error{
	simpleMessage?: string;

	constructor(arg?: any, defaultSimpleMessage?: string){
		if(arg instanceof Error){
			super(arg.message);
			this.name = this.constructor.name;
			this.simpleMessage = defaultSimpleMessage;

			return;
		}

		if(typeof arg != 'object'){
			if(arg !== undefined)
				arg = arg.toString();
			super(arg);
			this.name = this.constructor.name;
			this.simpleMessage = defaultSimpleMessage;

			return;
		}

		var info = arg ?? {} as ErrorInfo;
		var simpleMessage = info.simpleMessage ?? defaultSimpleMessage;

		if(info.error instanceof Error)
			super(info.error.message);
		else
			super(info.error ?? simpleMessage);
		this.name = this.constructor.name;
		this.simpleMessage = simpleMessage;
	}

	userFriendlyMessage(){
		return this.simpleMessage ?? 'Unknown error';
	}
}

export class NetworkError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Network error');
	}
}

export class HttpError extends GenericError{
	constructor(arg?: any, defaultSimpleMessage = 'Error communicating with server'){
		super(arg, defaultSimpleMessage);
	}
}

export class ClientError extends HttpError{}

export class ServerError extends HttpError{}

export class InternalServerError extends ServerError{}

export class ApiError extends HttpError{}

export class ParseError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Error processing input');
	}
}

export class SerializeError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Error serializing input');
	}
}

export class InternalError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Internal error');
	}
}

export class NotFoundError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Entity not found');
	}
}

export class InvalidArgumentError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Invalid argument');
	}
}

export class UnimplementedError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Function not implemented');
	}
}

export class UnsupportedError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Function not supported');
	}
}

export class PermissionDeniedError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Permission denied');
	}
}

export class RateLimitedError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Rate limited');
	}
}

export class UnavailableError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Resource unavailable, try again later');
	}
}

export class TimedOutError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Operation timed out');
	}
}

export class PreconditionFailedError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Precondition failed');
	}
}

export class AbortedError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Operation cancelled');
	}
}

export class ExistsError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Entity already exists');
	}
}