import express, { Request, Response } from 'express';
import * as bookController from "../controllers/book";
import { CreateBookDTO, FilterBookDTO } from "../dto/book";
import { DB } from '../../databases/database';
import { ResponseCustom } from '../helpers/response-handler';
import { RequestCustom } from '../helpers/request-handler';
import { Transaction } from 'sequelize';
import { verfiyToken } from "../middlewares/token-verification";
import { uploads } from '../../utlis/multer';

export default (router: express.Router) => {
    router.get('/book', verfiyToken, getBook);
    router.post('/book', uploads.single('file'), postBook);
};

const postBook = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        if (req.file == undefined) {
            return res.failValidationError('Please upload a pdf file!');
        }

        trx = await DB.transaction();
        const payload: CreateBookDTO = req.body;


        // Set body
        payload.book_code = ''
        payload.book = req.file.filename;

        // Delete the Response Body That Does Not Need to be Displayed
        const result = await bookController.postBook(trx, payload);
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

const getBook = async (req: RequestCustom, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const filters: FilterBookDTO = req.query;
        const result = await bookController.getBook(trx, filters);

        if (result.length === 0) return res.failNoData('No Data');

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
