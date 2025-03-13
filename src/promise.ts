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
	options;

	promise?: Promise<T>;
	error?: any;
	queued = false;

	constructor(task: () => Promise<T>, options?: {
		abortOnFail?: true;
		queueRun?: true;
	}){
		this.task = task;
		this.options = options;
	}

	private async taskOnce(){
		if(this.promise){
			if(this.options?.queueRun)
				this.queued = true;
			return;
		}

		do{
			this.queued = false;
			this.promise = this.task();

			try{
				await this.promise;
			}catch(e){
				if(this.options?.abortOnFail)
					return;
			}

			this.promise = undefined;
		}while(this.queued);
	}

	run(){
		this.taskOnce();

		return this.promise!;
	}

	clear(){
		this.promise = undefined;
	}
}