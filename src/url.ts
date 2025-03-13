import { KV } from './kv';

export const URLParams = {
	fromKV(kv: KV<any>){
		return new URLSearchParams(Object.entries(kv));
	},

	toKV(params: URLSearchParams | string){
		if(!(params instanceof URLSearchParams))
			params = new URLSearchParams(params);
		let kv: KV<any> = {};

		for(let [key, value] of params)
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

	constructor(url?: string){
		this.scheme = 'https';
		this.path_ = [];

		if(!url)
			return;
		let parsed = new URL(url);

		this.scheme = parsed.protocol.substring(0, parsed.protocol.length - 1);

		if(parsed.host !== '')
			this.host = parsed.host;
		this.path_ = [parsed.pathname.substring(1)];

		for(let [key, value] of parsed.searchParams)
			this.setParam(key, value);
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
		this.path_.push(path);
	}

	setParam(key: string, value: any){
		if(!this.params_)
			this.params_ = {};
		this.params_[key] = value;

		return this;
	}

	setParams(kv: string | KV<any> | Map<string, any>){
		if(typeof kv == 'string')
			kv = URLParams.toKV(kv);
		if(!this.params_){
			if(kv instanceof Map)
				kv = KV.fromMap(kv);
			this.params_ = kv;
		}else{
			let values = this.params_;

			for(let [key, value] of KV.entries(kv))
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
		let url = '';

		if(this.host !== undefined)
			url += this.origin;
		url += this.path;

		if(this.params_ !== undefined)
			url += `?${URLParams.fromKV(this.params_)}`;
		if(this.fragment)
			url += `#${this.fragment}`;
		return url;
	}

	build(){
		return this.href;
	}
}