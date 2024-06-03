import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_DIR, ORIGIN, BASEPATH, AZURE_SQL_USER, AZURE_SQL_PWD, AZURE_SQL_SERVER, AZURE_SQL_PORT, AZURE_SQL_DATABASE } = process.env;