import { Transaction } from "sequelize";
import * as Service from "../../../databases/services/book";
import { CreateBookDTO, FilterBookDTO } from "../../dto/book";
import { Book } from "../../interfaces";
import * as mapper from "./mapper";

export const postBook = async (transaction: Transaction, payload: CreateBookDTO): Promise<Book> => {
    const trx: Transaction = transaction;
    return mapper.toBook(await Service.postBook(trx, payload));
}

export const getBook = async (transaction: Transaction, filters?: FilterBookDTO): Promise<Book[]> => {
    const trx: Transaction = transaction;
    return (await Service.getBook(trx, filters || null)).map(mapper.toBook);
}