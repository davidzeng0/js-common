import { KV } from './kv';

export const URLParams = {
	fromKV(kv: KV<any>){
		return new URLSearchParams(Object.entries(kv));
	},

	toKV(params: URLSearchParams | string){
		if(!(params instanceof URLSearchParams))
			params = new URLSearchParams(params);
		var kv = KV.new<any>();

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
	path: string[];
	params?: string;
	fragment?: string;

	constructor(){
		this.scheme = 'https';
		this.path = [];
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
		this.path = [];
		this.addPath(path);
	}

	addPath(path: string){
		if(path.startsWith('/'))
			path = path.substring(1);
		this.path.push(path);
	}

	setParams(params: string | KV | URLSearchParams){
		this.params = URLParams.toString(params);

		return this;
	}

	setFragment(fragment: string){
		this.fragment = fragment;

		return this;
	}

	getOrigin(){
		return `${this.scheme}://${this.host}`;
	}

	getPath(){
		return `/${this.path.join('/')}`;
	}

	build(){
		var url = '';

		if(this.host !== undefined)
			url += this.getOrigin();
		url += this.getPath();

		if(this.params !== undefined)
			url += `?${this.params}`;
		if(this.fragment)
			url += `#${this.fragment}`;
		return url;
	}
}