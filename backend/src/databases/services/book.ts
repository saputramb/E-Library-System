import { Transaction } from "sequelize";
import * as bookDal from "../dal/book/book";
import { GetBookFilters } from "../dal/book/types";
import { bookCreationAttributes } from "databases/models/book";

export const postBook = (transaction: Transaction, payload: bookCreationAttributes): Promise<any[]> => {
    const trx: Transaction = transaction;
    return bookDal.postBook(trx, payload);
}

export const getBook = (transaction: Transaction, filters?: GetBookFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return bookDal.getBook(trx, filters || null)
}