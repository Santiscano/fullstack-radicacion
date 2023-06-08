import mysql from "mysql2/promise";
import "dotenv/config";


export const simplisticsConnection = mysql.createPool({
    host: process.env.HOST_DB_SIMPLISTICS,
    user: process.env.USER_DB_SIMPLISTICS,
    database: process.env.DATABASE_NAME_SIMPLISTICS,
    password: process.env.PASSWORD_DB_SIMPLISTICS,
});