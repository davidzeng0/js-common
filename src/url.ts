import { KV } from './kv';

export const URLParams = {
	fromKV(kv: KV<any>){
		return new URLSearchParams(Object.entries(kv));
	},

	toKV(params: URLSearchParams | string){
		if(!(params instanceof URLSearchParams))
			params = new URLSearchParams(params);
		var kv = KV.create<any>();

		for(var [key, value] of params)
			kv[key] = value;
		return kv;
	},

	toString(params: string | KV<any> | URLSearchParams){
		if(typeof params == 'string')
			return params;
		if(!(params instanceof URLSearchParams))
			params = this.fromKV(params);
		return params.toString();
	}
};

export class URLBuilder{
	scheme: string;
	host?: string;
	path_: string[];
	params_?: KV<any>;
	fragment?: string;

	constructor(){
		this.scheme = 'https';
		this.path_ = [];
	}

	setScheme(scheme: string){
		this.scheme = scheme;

		return this;
	}

	setHost(host: string){
		this.host = host;

		return this;
	}

	setPath(path: string){
		this.path_ = [];
		this.addPath(path);
	}

	addPath(path: string){
		if(path.startsWith('/'))
			path = path.substring(1);
		this.path_.push(path);
	}

	setParam(key: string, value: any){
		if(!this.params_)
			this.params_ = KV.create<any>();
		this.params_[key] = value;

		return this;
	}

	setParams(kv: string | KV<any> | Map<string, any>){
		if(!this.params_){
			if(kv instanceof Map)
				kv = KV.fromMap(kv);
			else if(typeof kv == 'string')
				kv = URLParams.toKV(kv);
			this.params_ = kv;
		}else{
			var values = this.params_ as KV<any>;

			for(var [key, value] of kv)
				values[key] = value;
		}

		return this;
	}

	setFragment(fragment: string){
		this.fragment = fragment;

		return this;
	}

	get origin(){
		return `${this.scheme}://${this.host}`;
	}

	get path(){
		return `/${this.path_.join('/')}`;
	}

	get href(){
		var url = '';

		if(this.host !== undefined)
			url += this.origin;
		url += this.path;

		if(this.params_ !== undefined)
			url += `?${this.params_}`;
		if(this.fragment)
			url += `#${this.fragment}`;
		return url;
	}

	build(){
		return this.href;
	}
}