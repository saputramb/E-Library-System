import { DB } from "../../../databases/database";
import { bookCreationAttributes, initModels } from "../../models/init-models";
import { GetBookFilters } from "./types";
import { Transaction, Op } from "sequelize";

const models = initModels(DB);

export const postBook = async (transaction: Transaction, payload: bookCreationAttributes): Promise<any> => {
    const trx: Transaction = transaction;
    return await models.book.create(payload, {
        transaction: trx
    });
}

export const getBook = async (transaction: Transaction, filters?: GetBookFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return await models.dmv_book.findAll({
        where: {
            ...(filters?.book_code && {
                book_code: filters?.book_code,
            }),
        },
        ...((filters?.book_code) && { paranoid: true }),
        attributes: ['book_code', 'category', 'title', 'author', 'publication_year', 'book'],
        transaction: trx
    });
}