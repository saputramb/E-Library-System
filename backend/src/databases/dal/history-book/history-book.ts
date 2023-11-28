import { DB } from "../../../databases/database";
import { history_bookCreationAttributes, initModels } from "../../models/init-models";
import { GetHistoryBookFilters } from "./types";
import { Transaction, Op } from "sequelize";

const models = initModels(DB);

export const postHistoryBook = async (transaction: Transaction, payload: history_bookCreationAttributes): Promise<any> => {
    const trx: Transaction = transaction;
    return await models.history_book.create(payload, {
        transaction: trx
    });
}

export const getHistoryBook = async (transaction: Transaction, filters?: GetHistoryBookFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return await models.dmv_history_book.findAll({
        where: {
            ...(filters?.book_code && {
                book_code: filters?.book_code,
            }),
            ...(filters?.borrower && {
                borrower: filters?.borrower,
            }),
        },
        ...((filters?.book_code || filters?.borrower) && { paranoid: true }),
        transaction: trx
    });
}

export const getBookBBorrowed = async (transaction: Transaction, filters?: GetHistoryBookFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return await models.dmv_books_borrowed.findAll({
        where: {
            ...(filters?.borrower && {
                borrower: filters?.borrower,
            }),
        },
        ...((filters?.borrower) && { paranoid: true }),
        transaction: trx
    });
}