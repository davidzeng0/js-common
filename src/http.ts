export enum HttpMethod{
	GET = 'GET',
	HEAD = 'HEAD',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	CONNECT = 'CONNECT',
	OPTIONS = 'OPTIONS',
	TRACE = 'TRACE',
	PATCH = 'PATCH'
}

export enum HttpHeader{
	CONTENT_TYPE = 'Content-Type',
	AUTHORIZATION = 'Authorization',
	COOKIE = 'Cookie',
	SET_COOKIE = 'Set-Cookie'
}

export enum HttpContentType{
	JSON = 'application/json',
	URLFORM = 'application/x-www-form-urlencoded',
	PROTOBUF = 'application/x-protobuf',
	OCTET_STREAM = 'application/octet-stream'
}