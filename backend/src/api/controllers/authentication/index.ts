import { Transaction } from "sequelize";
import * as Service from "../../../databases/services/authentication";
import { CreateAuthenticationDTO, FilterAuthenticationDTO } from "../../dto/authenticatoin";
import { Authentication } from "../../interfaces";
import * as mapper from "./mapper";

export const signUp = async (transaction: Transaction, payload: CreateAuthenticationDTO): Promise<Authentication> => {
    const trx: Transaction = transaction;
    return mapper.toAuthentication(await Service.signUp(trx, payload));
}

export const signOut = async (transaction: Transaction, id: number): Promise<Authentication> => {
    const trx: Transaction = transaction;
    return mapper.toAuthentication(await Service.signOut(trx, id));
}