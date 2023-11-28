import { Request, Response, NextFunction } from "express";

const responseCode = {
    created: 201,
    read: 200,
    updated: 200,
    deleted: 200,
    no_content: 204,
    invalid_request: 400,
    unsupported_response_type: 400,
    invalid_scope: 400,
    invalid_grant: 400,
    invalid_credentials: 400,
    invalid_refresh: 400,
    no_data: 400,
    invalid_data: 400,
    access_denied: 401,
    unauthorized: 401,
    invalid_client: 401,
    forbidden: 403,
    resource_not_found: 404,
    not_acceptable: 406,
    resource_exists: 409,
    conflict: 409,
    resource_gone: 410,
    payload_too_large: 413,
    unsupported_media_type: 415,
    too_many_requests: 429,
    server_error: 500,
    unsupported_grant_type: 501,
    not_implemented: 501,
    temporarily_unavailable: 503,
};

interface response {
    data?: any,
    description?: string,
    message?: string,
    status?: string
}

export interface ResponseCustom extends Response<response> {
    respondCreated(data: any, message: string): void;
    respondRead(data: any, message: string): void;
    respondUpdated(data: any, message: string): void;
    respondDeleted(message: string): void;
    respondNoContent(): void;
    failUnauthorized(description?: string): void;
    failForbidden(description?: string): void;
    failNotFound(description?: string): void;
    failNoData(description?: string): void;
    failValidationError(description?: string): void;
    failAccessDenied(description?: string): void;
    failResourceExists(description?: string): void;
    failResourceGone(description?: string): void;
    failTooManyRequests(description?: string): void;
    failServerError(description?: string): void;
}

const ResponseHandler = (req: Request, res: ResponseCustom, next: NextFunction = null) => {
    console.log("Middleware Response Handling");

    res.respondCreated = (data: any, message: string, status: string = 'Success') => {
        res.status(responseCode.created).json({ data, message, status })
    };

    res.respondRead = (data: any, message: string, status: string = 'Success') => {
        res.status(responseCode.read).json({ data, message, status })
    };

    res.respondUpdated = (data: any, message: string, status: string = 'Success') => {
        res.status(responseCode.updated).json({ data, message, status })
    };

    res.respondDeleted = (message: string, status: string = 'Success') => {
        res.status(responseCode.deleted).json({ message, status })
    };

    res.respondNoContent = () => {
        res.statusCode = responseCode.no_content;
        res.end();
    };

    res.failUnauthorized = (description?: string, message: string = 'Unauthorized', status: string = 'Error') => {
        res.status(responseCode.unauthorized).json({ message, description, status });
        next(Error(description));
    };

    res.failForbidden = (description?: string, message: string = 'Forbidden', status: string = 'Error') => {
        res.status(responseCode.forbidden).json({ message, description, status });
        next(Error(description));
    };

    res.failNoData = (description?: string, message: string = 'No Data', status: string = 'Error') => {
        res.status(responseCode.no_data).json({ message, description, status });
        next(Error(description));
    };

    res.failNotFound = (description?: string, message: string = 'Not Found', status: string = 'Error') => {
        res.status(responseCode.resource_not_found).json({ message, description, status });
        next(Error(description));
    };

    res.failValidationError = (description?: string, message: string = 'Bad Request', status: string = 'Error') => {
        res.status(responseCode.invalid_data).json({ message, description, status });
        next(Error(description));
    };

    res.failAccessDenied = (description?: string, message: string = 'Access Denied', status: string = 'Error') => {
        res.status(responseCode.access_denied).json({ message, description, status });
        next(Error(description));
    };

    res.failResourceExists = (description?: string, message: string = 'Conflict', status: string = 'Error') => {
        res.status(responseCode.resource_exists).json({ message, description, status });
        next(Error(description));
    };

    res.failResourceGone = (description?: string, message: string = 'Gone', status: string = 'Error') => {
        res.status(responseCode.resource_gone).json({ message, description, status });
        next(Error(description));
    };

    res.failTooManyRequests = (description?: string, message: string = 'Too Many Requests', status: string = 'Error') => {
        res.status(responseCode.too_many_requests).json({ message, description, status });
        next(Error(description));
    };

    res.failServerError = (description?: string, message: string = 'Internal Server Error', status: string = 'Error') => {
        res.status(responseCode.server_error).json({ message, description, status });
        next(Error(description));
    };

    if (next !== null)
        next();
};

export default {
    helper: () => ResponseHandler
};