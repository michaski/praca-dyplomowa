import { showAlert } from "../../components/alerts/Alert";
import { QueryFilters } from "../../models/Filters/QueryFilters";
import handleRequestError from "./handleRequestError";
import http from "./http";
import RequestError from "./requestError";

const requests = {
    get: async (url: string, authToken: string = '', filters?: QueryFilters, showErrorAlert?: boolean, onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.get(url, filters, authToken) as any;
            if (response instanceof RequestError) {
                handleRequestError(response, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            } else if (!response.errors) {
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            }
            return null;
        }
    },

    post: async (url: string, payload: any = null, authToken: string = '', showErrorAlert?: boolean, onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.post(url, payload, authToken) as any;
            if (response instanceof RequestError) {
                handleRequestError(response, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            } else if (response) {
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            }
            return null;
        }
    },

    put: async (url: string, payload: any = null, authToken: string = '', showErrorAlert?: boolean, onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.put(url, payload, authToken) as any;
            if (response instanceof RequestError) {
                handleRequestError(response, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            } else if (response !== undefined) {
                handleRequestError(response, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            }
            return null;
        }
    },

    delete: async (url: string, payload: any = null, authToken: string = '', showErrorAlert?: boolean, onError?: Function, redirectCallback?: Function) => {
        try {
            const response = await http.delete(url, payload, authToken) as any;
            if (response instanceof RequestError) {
                handleRequestError(response, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            } else if (response) {
                return response;
            }
        } catch (error) {
            if (onError) {
                onError(error);
            } else {
                handleRequestError(error, showErrorAlert !== undefined ? showErrorAlert : true, redirectCallback ? redirectCallback : (path: string) => {});
            }
            return null;
        }
    }
}

export default requests;