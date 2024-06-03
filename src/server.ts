import App from './app';
import validateEnv from './utils/validateEnv';
import { UsersRoute } from './routes';
import db from './db'
import { initModels } from './models'

validateEnv();

initModels(db);

const app = new App([
    new UsersRoute(), 
    ], db
);

app.listen();