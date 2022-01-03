import { useEffect, useState } from "react";
import http from "./http";
import useRequestErrorHandler from "./useRequestErrorHandler";

const useGet = (url: string, payload: string, authToken: string = '') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        try {
            http.get(url, payload, authToken)
                .then(data => {
                    setData(<any>data);
                }, error => {
                    setError(error);
                    useRequestErrorHandler(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } catch (error) {
            console.error(error);
        }
        
    }, [url]);
}

export default useGet;
