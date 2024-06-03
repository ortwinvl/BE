import { Sequelize } from 'sequelize'
import { AZURE_SQL_USER, AZURE_SQL_PWD, AZURE_SQL_SERVER, AZURE_SQL_PORT, AZURE_SQL_DATABASE } from './config';

const db: Sequelize = new Sequelize(AZURE_SQL_DATABASE, AZURE_SQL_USER, AZURE_SQL_PWD, {
  host: AZURE_SQL_SERVER,
  port: Number(AZURE_SQL_PORT),
  dialect: 'mssql',
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  },
  logging: false,
  dialectOptions: {
    options: {
      encrypt: true,
      // enableArithAbort: false,
      // cryptoCredentialsDetails: {
      //   minVersion: 'TLSv1'
      // }
    }
  },
  define:{
    underscored: true,
    timestamps: false
  }
});

export default db
