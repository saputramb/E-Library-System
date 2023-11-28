import { DB } from "../../databases/database";
import { initModels } from "../../databases/models/init-models";
import * as jwt from "jsonwebtoken";
import { ResponseCustom } from "api/helpers/response-handler";
import express, { Request, Response } from "express";
import { Transaction } from "sequelize";

const models = initModels(DB);

export default (router: express.Router) => {
    router.get('/refresh-token', createRefreshToken);
}

const createRefreshToken = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const refreshToken: string = req.cookies.refreshToken;
        if (!refreshToken) return res.failUnauthorized('No Tokens are Provided');
        const checkUser = await models.user.findOne({
            where: {
                refresh_token: refreshToken
            },
            transaction: trx
        });
        await trx.commit();
        if (!checkUser) return res.failForbidden('Invalid Token');
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) return res.failForbidden('Invalid Token');
            const newAccessToken = jwt.sign({
                id: checkUser.id,
                name: checkUser.name,
                email: checkUser.email,
                phone: checkUser.phone,
                gender: checkUser.gender,
                address: checkUser.address,
                role: checkUser.role,
            }, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: '1h',
            });
            return res.respondRead(newAccessToken, 'Successful in Getting new Tokens');
        });
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}