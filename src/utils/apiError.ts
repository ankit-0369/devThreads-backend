class ApiError extends Error {
    statusCode: number;
    data: any;  // You can replace 'any' with a specific type if needed
    success: boolean;
    errors: any[];  // You can replace 'any[]' with a specific type if you have a known error structure

    constructor(
        statusCode: number,
        message: string = "Default wrong message from apiError class",
        errors: any[] = [],  // You can replace 'any[]' with a specific type if necessary
        stack: string = ""
    ) {
        super(message);  // Call parent constructor with the message

        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
