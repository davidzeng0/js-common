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