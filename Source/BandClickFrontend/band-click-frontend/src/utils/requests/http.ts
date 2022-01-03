import { RequestError } from "./requestError";

enum MethodType {
    POST = 'POST',
    PUT = 'PUT',
    GET = 'GET',
    DELETE = 'DELETE'
}

const requestFunction = <R>(url: string, 
    payload: any, 
    method: MethodType, 
    auth: string): Promise<R> => {
    
    const options: RequestInit = {
        method,
        ...(!!auth && {
            headers: {
                Authorization: `Bearer ${auth}`
            }
        }),
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        }
    };
    let parsedUrl = url;
    if (
        method === MethodType.POST ||
        method === MethodType.PUT &&
        payload
    ) {
        options.body = JSON.stringify(payload);
        console.log(options.body);
    } else if (payload) {
        const query = Object
            .keys(payload)
            .map((key: string) => `${key}=${payload}`)
            .join('&');
        parsedUrl = `${url}?${query}`;
    }
    console.log(options);
    return new Promise((resolve, reject) => {
        fetch(parsedUrl, options)
        .then(res => res.json().then(data => {
            if (res.status === 200 || res.status === 203 || res.status === 204) {
                return data;
            } else {
                reject(new RequestError(res.status, data));
            }
        }))
        .then(json => resolve(json))
        .catch(err => reject(err));
    });
}

const http = {
    post: (url:string, payload: any, auth: string = '') => requestFunction(url, payload, MethodType.POST, auth),
    get: (url:string, payload: any, auth: string = '') => requestFunction(url, payload, MethodType.GET, auth),
    put: (url:string, payload: any, auth: string = '') => requestFunction(url, payload, MethodType.PUT, auth),
    delete: (url:string, payload: any, auth: string = '') => requestFunction(url, payload, MethodType.DELETE, auth)
}

export default http;
