import { AbortedError, NetworkError } from './error';
import { URLParams } from './url';
import { KV } from './kv';
import { HttpContentType, HttpHeader, HttpMethod } from './http';
import fetch, { BodyInit, Headers, FetchError } from 'node-fetch';

export interface Response{
	status: number;
	statusText: string;
	ok: boolean;
	headers: Headers;
	url: string;
	redirected: boolean;
	body: Buffer;
}

export type Payload = BodyInit | Uint8Array;

export class Request{
	method: string;
	url: string;
	headers?: KV<any>;
	params?: KV<any>;
	body?: any;

	constructor(url: string){
		this.method = HttpMethod.GET;
		this.url = url;
	}

	private setKV(name: keyof typeof this, key: string, value: any){
		if(!this[name])
			this[name] = KV.new<any>() as any;
		(this[name] as KV<any>)[key] = value;

		return this;
	}

	private setKVMany(name: keyof typeof this, kv: KV<any> | Map<string, any>){
		if(!this[name]){
			if(kv instanceof Map)
				kv = KV.fromMap(kv);
			this[name] = kv as any;
		}else{
			var values = this[name] as KV<any>;

			for(var [key, value] of kv)
				values[key] = value;
		}

		return this;
	}

	setMethod(method: string){
		this.method = method;
	}

	setHeader(key: string, value: any){
		return this.setKV('headers', key, value);
	}

	setHeaders(headers: KV<any> | Map<string, any>){
		return this.setKVMany('headers', headers);
	}

	setParam(key: string, value: any){
		return this.setKV('params', key, value);
	}

	setParams(params: KV<any> | Map<string, any>){
		return this.setKVMany('params', params);
	}

	post(body: Payload, contentType?: HttpContentType){;
		this.method = HttpMethod.POST;
		this.body = body;

		if(contentType !== undefined)
			this.setHeader(HttpHeader.CONTENT_TYPE, contentType);
		return this;
	}

	postForm(form: string | KV<any> | URLSearchParams){
		return this.post(URLParams.toString(form), HttpContentType.URLFORM);
	}

	postJSON(form: any){
		return this.post(JSON.stringify(form), HttpContentType.JSON);
	}

	postProtobuf(body: Payload){
		return this.post(body, HttpContentType.PROTOBUF);
	}

	postBinary(body: Payload, contentType = HttpContentType.OCTET_STREAM){
		return this.post(body, HttpContentType.OCTET_STREAM);
	}

	async execute(): Promise<Response>{
		var res, body;

		try{
			res = await fetch(this.url, {
				method: this.method,
				headers: this.headers,
				body: this.body,
				compress: true
			});

			body = await res.arrayBuffer();
		}catch(e){
			if((e as any).name == 'AbortError')
				throw new AbortedError(e);
			if(e instanceof FetchError)
				throw new NetworkError(e);
			throw e;
		}

		return {
			status: res.status,
			statusText: res.statusText,
			ok: res.ok,
			headers: res.headers,
			url: res.url,
			redirected: res.redirected,
			body: Buffer.from(body)
		};
	}
}