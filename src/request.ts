import { NetworkError } from './error';
import { URLParams } from './url';
import { KV } from './kv';
import fetch, { BodyInit } from 'node-fetch';

export enum CommonHeader{
	CONTENT_TYPE = 'Content-Type'
}

export enum CommonContentType{
	JSON = 'application/json',
	URLFORM = 'application/x-www-form-urlencoded',
	PROTOBUF = 'application/x-protobuf',
	OCTET_STREAM = 'application/octet-stream'
}

export interface Response{
	status: number;
	ok: boolean;
	headers: KV;
	rawHeaders: KV<string[]>;
	url: string;
	redirected: boolean;
	body: Buffer;
}

export class Request{
	method: string;
	url: string;
	headers?: KV;
	body?: BodyInit;

	constructor(url: string){
		this.method = 'GET';
		this.url = url;
	}

	setMethod(method: string){
		this.method = method;
	}

	setHeader(key: string, value: string){
		this.headers = this.headers ?? {};
		this.headers[key] = value;

		return this;
	}

	setHeaders(headers: KV | Map<string, string>){
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

	post(body: BodyInit){
		this.method = 'POST';
		this.body = body;

		return this;
	}

	postForm(form: string | KV | URLSearchParams){
		this.method = 'POST';
		this.body = URLParams.toString(form);
		this.setHeader(CommonHeader.CONTENT_TYPE, CommonContentType.URLFORM);

		return this;
	}

	postJSON(form: any){
		this.method = 'POST';
		this.body = JSON.stringify(form);
		this.setHeader(CommonHeader.CONTENT_TYPE, CommonContentType.JSON);

		return this;
	}

	postProtobuf(data: ArrayBuffer | ArrayBufferView | Buffer | string){
		this.method = 'POST';
		this.body = JSON.stringify(data);
		this.setHeader(CommonHeader.CONTENT_TYPE, CommonContentType.PROTOBUF);

		return this;
	}

	postBinary(data: ArrayBuffer | ArrayBufferView | Buffer | string){
		this.method = 'POST';
		this.body = data;
		this.setHeader(CommonHeader.CONTENT_TYPE, CommonContentType.OCTET_STREAM);

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
			headers: KV.fromMap(res.headers as any as Map<string, string>),
			rawHeaders: res.headers.raw() as KV<string[]>,
			url: res.url,
			redirected: res.redirected,
			body
		};
	}
}