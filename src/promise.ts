export class Promises{
	static resolveAfter(delay: number){
		return new Promise<void>((resolve) => setTimeout(resolve, delay));
	}

	static rejectAfter(delay: number){
		return new Promise<void>((_, reject) => setTimeout(reject, delay));
	}
}

export class ConcurrentPromise<T>{
	task;
	abortOnFail;

	promise?: Promise<T>;
	error?: any;

	constructor(task: () => Promise<T>, abortOnFail = false){
		this.task = task;
		this.abortOnFail = abortOnFail;
	}

	run(){
		if(this.error)
			throw this.error;
		if(!this.promise){
			this.promise = this.task();

			if(this.abortOnFail)
				this.promise.catch((e) => this.error = e);
			this.promise.finally(() => this.promise = undefined);
		}

		return this.promise;
	}

	clear(){
		this.error = undefined;
	}
}