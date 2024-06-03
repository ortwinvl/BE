import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_DIR, ORIGIN, ATLAS_URI, BASEPATH, VERIFIED_SENDER, SENDGRID_API_KEY, AZURE_BLOB_STORAGE,
    AZURE_SQL_USER, AZURE_SQL_PWD, AZURE_SQL_SERVER, AZURE_SQL_PORT, AZURE_SQL_DATABASE, CM_API_KEY, BASE_ORGANISATION } = process.env;

// export const azuresqlconfig = {
//     user: process.env.AZURE_SQL_USER,
//     password: process.env.AZURE_SQL_PWD,
//     server: process.env.AZURE_SQL_SERVER,
//     port: process.env.AZURE_SQL_PORT,
//     database: process.env.AZURE_SQL_DATABASE,
//     authentication: {
//         type: 'default'
//     },
//     options: {
//         encrypt: true
//     }
// };