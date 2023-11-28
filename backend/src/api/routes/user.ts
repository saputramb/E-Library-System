import express, { Request, Response } from 'express';
import * as userController from "../controllers/user";
import { FilterUserDTO } from "../dto/user";
import { DB } from '../../databases/database';
import { ResponseCustom } from '../helpers/response-handler';
import { RequestCustom } from '../helpers/request-handler';
import { Transaction } from 'sequelize';
import { verfiyToken } from "../middlewares/token-verification";

export default (router: express.Router) => {
    router.get('/users', verfiyToken, getUser);
};

const getUser = async (req: RequestCustom, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const { email, role } = req;
        const filters: FilterUserDTO = { email };
        const { users } = req.query;
        let result;
        if (role === 'admin' && users === 'show all') result = await userController.getUser(trx);
        else result = await userController.getUser(trx, filters);

        await trx.commit();
        return res.respondRead(result, 'Data Retrieved Successfully');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}
