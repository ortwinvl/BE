// /* eslint-disable no-undef */
// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-var */
// import { Sequelize } from '@sequelize/core';
// import { AZURE_SQL_USER, AZURE_SQL_PWD, AZURE_SQL_SERVER, AZURE_SQL_PORT, AZURE_SQL_DATABASE } from './src/config/index.ts';
// import Organisation from './src/models/organisation.model.ts'; 
// import User from './src/models/user.model.ts';
// import Enum from './src/models/enum.model.ts';
// import Country from './src/models/country.model.ts';
// import Location from './src/models/location.model.ts';
// import Mail from './src/models/mail.model.ts';
// import { SequelizeStorage, Umzug } from 'umzug';

// const sequelize = new Sequelize(String(AZURE_SQL_DATABASE), String(AZURE_SQL_USER), String(AZURE_SQL_PWD), {
//   host: AZURE_SQL_SERVER,
//   port: Number(AZURE_SQL_PORT),
//   dialect: 'mssql',
//   pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//   },
//   dialectOptions: {
//     options: {
//       encrypt: true,
//       // enableArithAbort: false,
//       // cryptoCredentialsDetails: {
//       //   minVersion: 'TLSv1'
//       // }
//     }
//   },
//   models:[Organisation, User, Enum, Country, Location, Mail]
// });

// const umzug = new Umzug({
//     migrations: {glob: 'migrations/*.js'},
//     context: sequelize.getQueryInterface(),
//     storage: new SequelizeStorage({sequelize}),
//     logger: console,
//   })

// exports.umzug = umzug

// if (require.main === module) {
//   umzug.runAsCLI()
// }