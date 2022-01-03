import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import http from "./http";

const useGet = (url: string, payload: any, authToken: string = '') => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const history = useHistory();

    useEffect(() => {
        setLoading(true);
        try {
            let payloadText = "";
            if (typeof payload === "object") {
                payloadText = JSON.stringify(payload);
            } else if (typeof payload === "string") {
                payloadText = payload;
            } else {
                console.error(`Wrong payload type: ${typeof payload}`);
            }
            http.get(url, payloadText, authToken)
                .then(data => {
                    setData(<any>data);
                    console.log("Fetch succesfull");
                }, error => {
                    setError(error);
                    // useRequestErrorHandler(error, (path: string) => history.push(path));
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
