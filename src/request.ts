import { NetworkError } from './error';
import { URLParams } from './url';
import { KV } from './kv';
import fetch, { BodyInit, Headers } from 'node-fetch';
import { HttpContentType, HttpHeader, HttpMethod } from './http';

export interface Response{
	status: number;
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
	body?: any;

	constructor(url: string){
		this.method = HttpMethod.GET;
		this.url = url;
	}

	setMethod(method: string){
		this.method = method;
	}

	setHeader(key: string, value: any){
		this.headers = this.headers ?? {};
		this.headers[key] = value;

		return this;
	}

	setHeaders(headers: KV<any> | Map<string, any>){
		if(!this.headers){
			if(headers instanceof Map)
				headers = KV.fromMap(headers);
			this.headers = headers;

			return this;
		}

		if(headers instanceof Map){
			for(var [key, value] of headers)
				this.headers[key] = value;
		}else{
			for(var key in headers)
				this.headers[key] = headers[key];
		}

		return this;
	}

	post(body: Payload){;
		this.method = HttpMethod.POST;
		this.body = body;

		return this;
	}

	postForm(form: string | KV<any> | URLSearchParams){
		this.method = HttpMethod.POST;
		this.body = URLParams.toString(form);
		this.setHeader(HttpHeader.CONTENT_TYPE, HttpContentType.URLFORM);

		return this;
	}

	postJSON(form: any){
		this.method = HttpMethod.POST;
		this.body = JSON.stringify(form);
		this.setHeader(HttpHeader.CONTENT_TYPE, HttpContentType.JSON);

		return this;
	}

	postProtobuf(body: Payload){
		this.method = HttpMethod.POST;
		this.body = body;
		this.setHeader(HttpHeader.CONTENT_TYPE, HttpContentType.PROTOBUF);

		return this;
	}

	postBinary(body: Payload){
		this.method = HttpMethod.POST;
		this.body = body;
		this.setHeader(HttpHeader.CONTENT_TYPE, HttpContentType.OCTET_STREAM);

		return this;
	}

	async execute(): Promise<Response>{
		var res;

		try{
			res = await fetch(this.url, {
				method: this.method,
				headers: this.headers,
				body: this.body,
				compress: true
			});
		}catch(error){
			throw new NetworkError({error});
		}

		var body;

		try{
			body = await res.buffer();
		}catch(error){
			throw new NetworkError({error});
		}

		return {
			status: res.status,
			ok: res.ok,
			headers: res.headers,
			url: res.url,
			redirected: res.redirected,
			body
		};
	}
}