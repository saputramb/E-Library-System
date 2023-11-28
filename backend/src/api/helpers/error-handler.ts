import { NextFunction, Request } from "express";
import { ResponseCustom } from "./response-handler";

const ErrorHandler = (req: Request, res: ResponseCustom, next: NextFunction) => {
    console.log("Middleware Error Handling");
    const error = Error(`API ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl} Not found`);
    res.failNotFound(error.message);
}

export default {
    helper: () => ErrorHandler
};