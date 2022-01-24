class RequestError {
    statusCode: number;
    message: any;

    constructor(statusCode: number, message: any) {
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default RequestError;
