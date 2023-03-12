interface ErrorInfo{
	simpleMessage?: string;
	error?: any;
}

export type ErrorArg = ErrorInfo | string;

export class GenericError extends Error{
	simpleMessage?: string;

	constructor(arg?: ErrorArg, defaultSimpleMessge?: string){
		if(typeof arg == 'string')
			super(arg);
		else{
			var {simpleMessage, error} = arg ?? {};

			if(error instanceof Error)
				super(error.message);
			else
				super(error);
			this.simpleMessage = simpleMessage ?? defaultSimpleMessge;
		}

		this.name = this.constructor.name;
	}

	userFriendlyMessage(){
		return this.simpleMessage ?? 'Unknown error';
	}
}

export class NetworkError extends GenericError{
	constructor(arg?: ErrorArg){
		super(arg, 'Network error');
	}
}

export class ClientError extends GenericError{
	constructor(arg?: ErrorArg){
		super(arg, 'Client error');
	}
}

export class ServerError extends GenericError{
	constructor(arg?: ErrorArg){
		super(arg, 'Server error');
	}
}

export class ParseError extends GenericError{
	constructor(arg?: ErrorArg){
		super(arg, 'Error parsing input');
	}
}

export class SerializeError extends GenericError{
	constructor(arg?: ErrorArg){
		super(arg, 'Error serializing input');
	}
}

export class InternalError extends GenericError{
	constructor(arg?: ErrorArg){
		super(arg, 'Internal error');
	}
}