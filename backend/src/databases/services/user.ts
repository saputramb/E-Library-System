import { Transaction } from "sequelize";
import * as userDal from "../dal/user/user";
import { GetUserFilters } from "../dal/user/types";

export const getUser = (transaction: Transaction, filters?: GetUserFilters): Promise<any[]> => {
    const trx: Transaction = transaction;
    return userDal.getUser(trx, filters || null)
}