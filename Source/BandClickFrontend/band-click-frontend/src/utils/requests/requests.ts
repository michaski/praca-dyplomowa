import { QueryFilters } from "../../models/Filters/QueryFilters";
import handleRequestError from "./handleRequestError";
import http from "./http";

const requests = {
    get: async (url: string, authToken: string = '', filters?: QueryFilters, onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.get(url, filters, authToken) as any;
            if (!response.errors) {
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, redirectCallback ? redirectCallback : (path: string) => {});
            }
            // alert(error);
            return error;
        }
    },

    post: async (url: string, payload: any = null, authToken: string = '', onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.post(url, payload, authToken) as any;
            if (response) {
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, redirectCallback ? redirectCallback : (path: string) => {});
            }
        }
    },

    put: async (url: string, payload: any = null, authToken: string = '', onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.put(url, payload, authToken) as any;
            if (response) {
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, redirectCallback ? redirectCallback : (path: string) => {});
            }
        }
    },

    delete: async (url: string, payload: any = null, authToken: string = '', onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.delete(url, payload, authToken) as any;
            if (response) {
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, redirectCallback ? redirectCallback : (path: string) => {});
            }
        }
    }
}

export default requests;