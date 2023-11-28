import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

export interface RequestCustom extends Request {
    body: any
    query: any
    params: any
    email?: any
    role?: any
    headers: IncomingHttpHeaders & {
        customHeader?: string
    };
}