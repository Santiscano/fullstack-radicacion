import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

export const connection = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_NAME,
    password: process.env.PASSWORD_DB,
});