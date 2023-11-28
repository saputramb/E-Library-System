import { Transaction } from "sequelize";
import * as Service from "../../../databases/services/history-book";
import { CreateHistoryBookDTO, FilterHistoryBookDTO } from "../../dto/history-book";
import { HistoryBook } from "../../interfaces";
import * as mapper from "./mapper";

export const postHistoryBook = async (transaction: Transaction, payload: CreateHistoryBookDTO): Promise<HistoryBook> => {
    const trx: Transaction = transaction;
    return mapper.toHistoryBook(await Service.postHistoryBook(trx, payload));
}

export const getHistoryBook = async (transaction: Transaction, filters?: FilterHistoryBookDTO): Promise<HistoryBook[]> => {
    const trx: Transaction = transaction;
    return (await Service.getHistoryBook(trx, filters)).map(mapper.toHistoryBook);
}

export const getBookBBorrowed = async (transaction: Transaction, filters?: FilterHistoryBookDTO): Promise<HistoryBook[]> => {
    const trx: Transaction = transaction;
    return (await Service.getBookBBorrowed(trx, filters || null)).map(mapper.toHistoryBook);
}