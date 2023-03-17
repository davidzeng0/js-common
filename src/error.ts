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

			return;
		}

		if(typeof arg != 'object'){
			super(arg.toString());
			this.name = this.constructor.name;

			return;
		}

		var info = arg ?? {} as ErrorInfo;
		var simpleMessage = info.simpleMessage ?? defaultSimpleMessage;

		if(info.error instanceof Error)
			super(info.error.message);
		else
			super(info.error ?? simpleMessage);
		this.simpleMessage = simpleMessage;
		this.name = this.constructor.name;
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

export class ClientError extends HttpError{
	constructor(arg?: any){
		super(arg);
	}
}

export class ServerError extends HttpError{
	constructor(arg?: any){
		super(arg);
	}
}

export class ApiError extends HttpError{
	constructor(arg?: any){
		super(arg);
	}
}

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