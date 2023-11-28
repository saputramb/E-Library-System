import { Transaction } from "sequelize";
import * as historyDal from "../dal/history-book/history-book";
import { GetHistoryBookFilters } from "../dal/history-book/types";
import { history_bookAttributes } from "databases/models/historyBook";

export const postHistoryBook = (transaction: Transaction, payload: history_bookAttributes): Promise<any[]> => {
    const trx: Transaction = transaction;
    return historyDal.postHistoryBook(trx, payload);
}

export const getHistoryBook = (transaction: Transaction, filters?: GetHistoryBookFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return historyDal.getHistoryBook(trx, filters);
}

export const getBookBBorrowed = (transaction: Transaction, filters?: GetHistoryBookFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return historyDal.getBookBBorrowed(trx, filters || null);
}