import dotenv from 'dotenv';
dotenv.config();

export interface DbConfig {
    type: DbType;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}
export type DbType = 'mysql';

export const dbConfig: DbConfig = {
    type: process.env.DB_TYPE as DbType,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};
