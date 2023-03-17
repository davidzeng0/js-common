export interface ErrorInfo{
	simpleMessage?: string;
	error?: any;
}

export class GenericError extends Error{
	simpleMessage?: string;

	constructor(arg?: any, defaultSimpleMessge?: string){
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

		if(info.error instanceof Error)
			super(info.error.message);
		else
			super(info.error);
		this.simpleMessage = info.simpleMessage ?? defaultSimpleMessge;
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
	constructor(arg?: any, defaultSimpleMessage = 'HTTP error'){
		super(arg, defaultSimpleMessage);
	}
}

export class ClientError extends HttpError{
	constructor(arg?: any){
		super(arg, 'Client error');
	}
}

export class ServerError extends HttpError{
	constructor(arg?: any){
		super(arg, 'Server error');
	}
}

export class ApiError extends HttpError{
	constructor(arg?: any){
		super(arg, 'API error');
	}
}

export class ParseError extends GenericError{
	constructor(arg?: any){
		super(arg, 'Error parsing input');
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