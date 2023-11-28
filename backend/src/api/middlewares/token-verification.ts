import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ResponseCustom } from "../helpers/response-handler";
import { RequestCustom } from "../helpers/request-handler";
import { Transaction } from "sequelize";
import { DB } from "../../databases/database";
import { initModels } from "../../databases/models/init-models";
import { FilterAuthenticationDTO } from "api/dto/authenticatoin";

const models = initModels(DB);

export const verfiyToken = async (req: RequestCustom, res: ResponseCustom, next: NextFunction): Promise<any> => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.failUnauthorized('No Tokens are Provided');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.failForbidden('Invalid Token');
        if (typeof decoded === 'object' && 'email' in decoded && 'role' in decoded) {
            req.email = decoded.email
            req.role = decoded.role
            next();
        }
    });
}

export const verifyRefreshToken = async (transaction: Transaction, filters?: FilterAuthenticationDTO): Promise<any> => {
    const trx: Transaction = transaction;
    const checkRefreshToken = await models.user.findOne({
        where: {
            refresh_token: filters.refresh_token
        },
        transaction: trx
    });
    return checkRefreshToken;
}