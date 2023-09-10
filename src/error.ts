export interface ErrorInfo{
	simpleMessage?: string;
	error?: any;
}

function parseErrorArg(arg?: any, defaultSimpleMessage?: string){
	if(typeof arg != 'object'){
		if(arg !== undefined)
			arg = arg.toString();
		return {
			message: arg,
			simpleMessage: defaultSimpleMessage
		};
	}

	if(arg instanceof Error){
		return {
			message: arg.message,
			simpleMessage: (arg as any).simpleMessage ?? defaultSimpleMessage
		}
	}

	let info = arg as ErrorInfo | undefined;
	let message, simpleMessage = info?.simpleMessage;

	if(info?.error instanceof Error){
		message = info.error.message;

		if(!simpleMessage)
			simpleMessage = (info.error as any).simpleMessage;
	}else{
		message = info?.error ?? simpleMessage;
	}

	if(!simpleMessage)
		simpleMessage = defaultSimpleMessage;
	return {
		message: message ?? simpleMessage,
		simpleMessage
	}
}

export class GenericError extends Error{
	simpleMessage?: string;

	constructor(arg?: any, defaultSimpleMessage?: string){
		let {message, simpleMessage} = parseErrorArg(arg, defaultSimpleMessage);

		super(message);
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

export class Errors{
	static toString(e: unknown){
		if(e instanceof Error)
			return e.stack ?? e.message;
		return `${e}`;
	}
}