import { KV } from './kv';

export const URLParams = {
	fromKV(kv: KV<any>){
		var params = new URLSearchParams();

		for(var key in kv)
			params.set(key, kv[key]);
		return params;
	},

	toKV(params: URLSearchParams | string){
		if(!(params instanceof URLSearchParams))
			params = new URLSearchParams(params);
		var kv: KV = {};

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
	path?: string;
	params?: string;
	fragment?: string;

	constructor(){
		this.scheme = 'https';
	}

	setScheme(scheme: string){
		this.scheme = scheme;

		return this;
	}

	setHost(host: string){
		this.host = host;

		return this;
	}

	setParams(params: string | KV | URLSearchParams){
		this.params = URLParams.toString(params);

		return this;
	}

	setFragment(fragment: string){
		this.fragment = fragment;

		return this;
	}

	build(){
		var url = '';

		if(this.host !== undefined)
			url += `${this.scheme}://${this.host}`;
		url += '/';

		if(this.path)
			url += this.path;
		if(this.params !== undefined)
			url += `?${this.params}`;
		if(this.fragment)
			url += `#${this.fragment}`;
		return url;
	}
}