import handleRequestError from "./handleRequestError";
import http from "./http";

class Requests {
    isLoading: boolean = false;
    data: any = null;
    error: any = null;
    redirectCallback: Function;

    constructor(redirectCallback: Function = (path: string) => {}) {
        this.redirectCallback = redirectCallback;
    }

    get = async (url: string, payload: any = null, authToken: string = '') => {
        try {
            this.isLoading = true;
            const response = await http.get(url, payload, authToken) as any;
            this.isLoading = false;
            if (response) {
                this.data = response;
                return response;
            }
        } catch (error) {
            this.error = error;
            handleRequestError(error, this.redirectCallback);
        }
    }

    post = async (url: string, payload: any = null, authToken: string = '') => {
        try {
            this.isLoading = true;
            const response = await http.post(url, payload, authToken) as any;
            this.isLoading = false;
            if (response) {
                this.data = response;
                return response;
            }
        } catch (error) {
            this.error = error;
            handleRequestError(error, (path: string) => {});
        }
    }

    put = async (url: string, payload: any = null, authToken: string = '') => {
        try {
            this.isLoading = true;
            const response = await http.put(url, payload, authToken) as any;
            this.isLoading = false;
            if (response) {
                this.data = response;
                return response;
            }
        } catch (error) {
            this.error = error;
            handleRequestError(error, (path: string) => {});
        }
    }

    delete = async (url: string, payload: any = null, authToken: string = '') => {
        try {
            this.isLoading = true;
            const response = await http.delete(url, payload, authToken) as any;
            this.isLoading = false;
            if (response) {
                this.data = response;
                return response;
            }
        } catch (error) {
            this.error = error;
            handleRequestError(error, (path: string) => {});
        }
    }
}

export default Requests;