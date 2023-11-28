import * as dotenv from 'dotenv';
dotenv.config();

// SERVER
export const PORT_SERVER = Number(process.env.PORT_SERVER);

// DATABASE AUTHENTICATION
export const HOST = String(process.env.HOST_DB);
export const USERNAME = String(process.env.USERNAME_DB);
export const PASSWORD = String(process.env.PASSWORD_DB);
export const DATABASE = String(process.env.DATABASE_DB);
export const DIALECT = String(process.env.DIALECT_DB);
export const PORT = Number(process.env.PORT_DB);