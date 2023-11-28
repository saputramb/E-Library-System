import { Transaction } from "sequelize";
import * as authenticationDal from "../dal/authentication/authentication";
import { userCreationAttributes } from "databases/models/user";
import { GetUserFilters } from "databases/dal/user/types";

export const signUp = (transaction: Transaction, payload: userCreationAttributes): Promise<any[]> => {
    const trx: Transaction = transaction;
    return authenticationDal.signUp(trx, payload);
}

export const signOut = (transaction: Transaction, id: number): Promise<any[]> => {
    const trx: Transaction = transaction;
    return authenticationDal.signOut(trx, id);
}