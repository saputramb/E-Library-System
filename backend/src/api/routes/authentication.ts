import express, { Request, Response } from 'express';
import * as authenticationController from "../controllers/authentication";
import { CreateAuthenticationDTO, FilterAuthenticationDTO } from "../dto/authenticatoin";
import { DB } from '../../databases/database';
import { ResponseCustom } from '../helpers/response-handler';
import { RequestCustom } from '../helpers/request-handler';
import { Transaction } from 'sequelize';
import { hash, genSalt } from "bcrypt";
import * as validationAuthentication from "../middlewares/validation-authentication";
import { createToken } from "../middlewares/create-token";
import { cookieOption } from '../middlewares/cookie-option';
import * as EmailValidator from 'email-validator';
import { verifyRefreshToken } from '../middlewares/token-verification';

export default (router: express.Router) => {
    router.post('/sign-up', signUp);
    router.post('/sign-in', signIn);
    router.delete('/sign-out', signOut);
};

const signUp = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const payload: CreateAuthenticationDTO = req.body;

        // Check Email Exist
        const emailExist = await validationAuthentication.checkEmailExist(trx, payload.email);
        if (emailExist) return res.failValidationError('Email Has Been Registered');

        // Check Email Payload
        if (!EmailValidator.validate(payload.email)) return res.failValidationError('Invalid Email');

        // Hashing Password
        const salt = await genSalt();
        const hashPassword = await hash(payload.password, salt);
        payload.password = hashPassword;

        // Delete the Response Body That Does Not Need to be Displayed
        const result = await authenticationController.signUp(trx, payload);
        delete result.id;
        delete result.password;
        delete result.refresh_token;
        delete result.created_at;
        delete result.updated_at;

        await trx.commit();
        return res.respondCreated(result, 'Account Successfully Registered');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}

const signIn = async (req: Request, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const filters: FilterAuthenticationDTO = req.body;
        const payload: CreateAuthenticationDTO = req.body;

        // Check Email Exist
        if (payload.email !== undefined) {
            const emailExist = await validationAuthentication.checkEmailExist(trx, payload.email);
            if (payload.email !== undefined && !emailExist) return res.failAccessDenied('Email Not Found');
        }

        // Check Password
        const match = await validationAuthentication.checkPassword(trx, payload, filters);
        if (!match) return res.failAccessDenied('Password Wrong');

        // Create Token Secret
        const token = await createToken(trx, filters);
        const accessToken = token.accessToken
        const refreshToken = token.refreshToken

        // Only set Secure to True in Production
        if (process.env.NODE_ENV === 'production') cookieOption.secure = true;

        // Send Refresh Token in Cookie
        res.cookie('refreshToken', refreshToken, cookieOption);

        await trx.commit();
        return res.respondRead(accessToken, 'Login Successfully');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }

}

const signOut = async (req: RequestCustom, res: ResponseCustom): Promise<any> => {
    let trx: Transaction;
    try {
        trx = await DB.transaction();
        const filters: FilterAuthenticationDTO = req.body;

        // Check for Refresh Token in Cookies and Body
        filters.refresh_token = req.cookies.refreshToken;
        if (!filters.refresh_token) return res.failValidationError('Failed to Logout');

        // Check Account Based on Refresh Token
        const checkAccount = await verifyRefreshToken(trx, filters);
        if (!checkAccount) return res.failValidationError('Failed to Logout');

        // Remove Refresh Token on Cookies and Database
        await authenticationController.signOut(trx, checkAccount.id);
        res.clearCookie('refreshToken');

        await trx.commit();
        return res.respondDeleted('Logout Successfully');
    } catch (error) {
        if (trx) {
            await trx.rollback();
            res.failServerError(error.message);
        }
    } finally {
        console.log('Execution has finished');
    }
}