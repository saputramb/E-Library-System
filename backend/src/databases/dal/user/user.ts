import { DB } from "../../../databases/database";
import { initModels } from "../../models/init-models";
import { GetUserFilters } from "./types";
import { Transaction, Op } from "sequelize";

const models = initModels(DB);

export const getUser = async (transaction: Transaction, filters?: GetUserFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return await models.dmv_user.findAll({
        where: {
            ...(filters?.email && {
                email: filters?.email,
            }),
        },
        ...((filters?.email) && { paranoid: true }),
        transaction: trx
    });
}