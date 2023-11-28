import { Transaction, Op } from "sequelize";
import { DB } from "../../databases/database";
import { initModels } from "../../databases/models/init-models";
import * as jwt from "jsonwebtoken";
import { FilterAuthenticationDTO } from "../dto/authenticatoin";

const models = initModels(DB);

export const createToken = async (transaction: Transaction, filters?: FilterAuthenticationDTO): Promise<any> => {
    const trx: Transaction = transaction;
    const checkUser = await models.user.findOne({
        where: {
            ...(filters?.email && {
                email: filters?.email
            })
        },
        ...((filters?.email) && { paranoid: true }),
        transaction: trx
    });
    const accessToken = jwt.sign({
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        phone: checkUser.phone,
        gender: checkUser.gender,
        address: checkUser.address,
        role: checkUser.role,
    }, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: '1h',
    });
    const refreshToken = jwt.sign({
        id: checkUser.id,
        name: checkUser.name,
        email: checkUser.email,
        phone: checkUser.phone,
        gender: checkUser.gender,
        address: checkUser.address,
        role: checkUser.role,
    }, process.env.REFRESH_TOKEN_SECRET, {
        algorithm: 'HS256',
        allowInsecureKeySizes: true,
        expiresIn: '1d',
    });
    await models.user.update({ refresh_token: refreshToken }, {
        where: {
            id: checkUser.id
        },
        transaction: trx
    });
    return { accessToken, refreshToken };
}