import { Transaction } from "sequelize";
import * as Service from "../../../databases/services/user";
import { FilterUserDTO } from "../../dto/user";
import { Users } from "../../interfaces";
import * as mapper from "./mapper";

export const getUser = async (transaction: Transaction, filters?: FilterUserDTO): Promise<Users[]> => {
    const trx: Transaction = transaction;
    return (await Service.getUser(trx, filters || null)).map(mapper.toUser);
}