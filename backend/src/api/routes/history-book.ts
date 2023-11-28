import express, { Request, Response } from 'express';
import * as historyBookController from "../controllers/history-book";
import { CreateHistoryBookDTO, FilterHistoryBookDTO } from "../dto/history-book";
import { DB } from '../../databases/database';
import { ResponseCustom } from '../helpers/response-handler';
import { RequestCustom } from '../helpers/request-handler';
import { Transaction } from 'sequelize';
import { verfiyToken } from "../middlewares/token-verification";

export default (router: express.Router) => {
    router.get('/history-book', verfiyToken, getHistoryBook);
    router.get('/book-borrowed', verfiyToken, getBookBBorrowed);
    router.post('/history-book', postHistoryBook);
};

const postHistoryBook = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const filters: FilterHistoryBookDTO = req.body;
        const payload: CreateHistoryBookDTO = req.body;

        const borrowed = await historyBookController.getBookBBorrowed(trx, filters);

        if (payload.remarks === 'BORROWED' && borrowed.length !== 0) return res.failValidationError('Each user can only borrow a maximum of 1 book');

        // Delete the Response Body That Does Not Need to be Displayed
        const result = await historyBookController.postHistoryBook(trx, payload);
        delete result.id;
        delete result.created_at;
        delete result.updated_at;

        await trx.commit();
        return res.respondCreated(result, 'Data Entered Successfully');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}

const getHistoryBook = async (req: RequestCustom, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const filters: FilterHistoryBookDTO = req.query;
        const result = await historyBookController.getHistoryBook(trx, filters);

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

const getBookBBorrowed = async (req: RequestCustom, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const filters: FilterHistoryBookDTO = req.query;
        const result = await historyBookController.getBookBBorrowed(trx, filters);

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
