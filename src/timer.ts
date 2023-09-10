export class Timer{
	initial?: number;
	repeat?: number;
	callback?: Function;
	callbackArgs?: any[];
	timer?: NodeJS.Timeout;
	expire?: number;

	inCallback = false;
	isRepeat = false;

	constructor(options: {
		initialTimeout?: number;
		repeatTimeout?: number;
		start?: boolean;
	}, callback?: Function, callbackArgs?: any){
		this.initial = options.initialTimeout;
		this.repeat = options.repeatTimeout;
		this.callback = callback;
		this.callbackArgs = callbackArgs instanceof Array ? callbackArgs : [callbackArgs];

		if(options.start)
			this.start();
	}

	private invokeCallback(){
		this.expire = undefined;

		if(!this.callback)
			return;
		this.inCallback = true;

		try{
			if(this.callbackArgs)
				this.callback(...this.callbackArgs);
			else
				this.callback();
		}finally{
			this.inCallback = false;
		}
	}

	private internalStart(){
		let time = this.initial ?? this.repeat;

		if(this.isRepeat){
			if(this.repeat === undefined)
				return;
			time = this.repeat;
		}

		if(time === undefined)
			return;
		this.expire = Date.now() + time;
		this.timer = setTimeout(() => {
			this.invokeCallback();

			if(this.timer !== undefined){
				this.isRepeat = true;
				this.stop();
				this.internalStart();
			}
		}, time);
	}

	start(time?: number, repeat?: number){
		if(repeat !== undefined)
			this.repeat = time;
		if(time !== undefined){
			if(repeat !== undefined)
				this.initial = time;
			else if(this.repeat !== undefined && this.initial === undefined)
				this.repeat = time;
			else
				this.initial = time;
		}

		this.isRepeat = false;

		if(this.inCallback)
			return;
		this.stop();
		this.internalStart();
	}

	stop(){
		if(!this.active)
			return;
		clearTimeout(this.timer);

		this.timer = undefined;
		this.expire = undefined;
	}

	get active(){
		return this.timer !== undefined;
	}
}