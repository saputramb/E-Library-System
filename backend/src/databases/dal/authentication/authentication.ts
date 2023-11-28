import { DB } from "../../database";
import { initModels, userCreationAttributes } from "../../models/init-models";
import { Transaction, Op } from "sequelize";

const models = initModels(DB);

export const signUp = async (transaction: Transaction, payload: userCreationAttributes): Promise<any> => {
    const trx: Transaction = transaction;
    return await models.user.create(payload, {
        transaction: trx
    });
}

export const signOut = async (transaction: Transaction, id: number): Promise<any> => {
    const trx: Transaction = transaction;
    return await models.user.update({ refresh_token: null }, {
        where: {
            id
        },
        transaction: trx
    });
}