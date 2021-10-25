class RequestError {
    code: number;
    error: any;

    constructor(code: number, error: any) {
        this.code = code;
        this.error = error;
    }
}

export default RequestError;
