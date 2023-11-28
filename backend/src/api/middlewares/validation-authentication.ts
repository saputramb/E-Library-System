import { Transaction } from "sequelize";
import { DB } from "../../databases/database";
import { initModels } from "../../databases/models/init-models";
import { isEmpty } from "lodash";
import * as bcrypt from "bcrypt";
import { CreateAuthenticationDTO, FilterAuthenticationDTO } from "api/dto/authenticatoin";

const models = initModels(DB);

export const checkEmailExist = async (transaction: Transaction, email: string): Promise<boolean> => {
    const trx: Transaction = transaction;
    const checkEmail = await models.user.findOne({
        where: {
            email
        },
        transaction: trx
    });
    return !isEmpty(checkEmail);
}

export const checkPassword = async (transaction: Transaction, payload: CreateAuthenticationDTO, filters?: FilterAuthenticationDTO): Promise<boolean> => {
    const trx: Transaction = transaction;
    const checkPassword = await models.user.findOne({
        where: {
            ...(filters?.email && {
                email: filters?.email
            })
        },
        ...((filters?.email) && { paranoid: true }),
        transaction: trx
    });
    return await bcrypt.compare(payload.password, checkPassword.password);
}