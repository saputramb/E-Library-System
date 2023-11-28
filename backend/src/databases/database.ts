import * as config from "../config/config";
import { Dialect, Sequelize } from "sequelize";

export const DB = new Sequelize({
    dialect: config.DIALECT as Dialect,
    host: config.HOST,
    port: config.PORT,
    database: config.DATABASE,
    username: config.USERNAME,
    password: config.PASSWORD,
    dialectOptions: {
        statement_timeout: 1000,
        idle_in_transaction_session_timeout: 5000
    }
});