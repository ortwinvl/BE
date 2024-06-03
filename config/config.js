/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

module.exports = {
  development: {
    dialect: 'mssql',
    dialectOptions: { 
      instanceName: "SQLEXPRESS",
      options: { encrypt: true }
    },
    database: process.env.AZURE_SQL_DATABASE || 'ArmBackOffice',
    username: process.env.AZURE_SQL_USER || 'sa',
    password: process.env.AZURE_SQL_PWD || 'Password1',
    host: process.env.AZURE_SQL_SERVER || 'localhost',
    port: parseInt(process.env.AZURE_SQL_PORT || '1433'),
   
  },
  test: {
    dialect: 'mssql',
    database: process.env.AZURE_SQL_DATABASE || 'ArmBackOffice',
    username: process.env.AZURE_SQL_USER || 'sa',
    password: process.env.AZURE_SQL_PWD || 'Password1',
    host: process.env.AZURE_SQL_SERVER || 'localhost',
    port: parseInt(process.env.AZURE_SQL_PORT || '1433')
  },
  production: {
    dialect: 'mssql',
    database: process.env.AZURE_SQL_DATABASE || 'ArmBackOffice',
    username: process.env.AZURE_SQL_USER || 'sa',
    password: process.env.AZURE_SQL_PWD || 'Password1',
    host: process.env.AZURE_SQL_SERVER || 'localhost',
    port: parseInt(process.env.AZURE_SQL_PORT || '1433')
  }
}