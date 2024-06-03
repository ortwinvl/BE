/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import session, { SessionOptions } from 'express-session';
import fileUpload from 'express-fileupload';

import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import path from 'path';
import cors from 'cors';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS, SECRET_KEY } from './config';
import { IRoute } from "./interfaces";
import { Sequelize } from 'sequelize';

const SequelizeStore = require("connect-session-sequelize")(session.Store);

declare module 'express-session' {
  interface SessionData {
    user?: {
      accessToken?: string,
      expiresAt?: string,
      ipaddress?: string,
    }
  }
}

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  static basedir = path.dirname(__filename);
  static instance;

  constructor(routes : IRoute[], db: Sequelize) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 5000;

    this.initializeMiddlewares(db);
    this.initializeRoutes(routes);
  }

  static getInstance(routes, db) {
  if (!this.instance) {
      this.instance = new App(routes, db);
    }

    return this.instance;
  }

  private async initializeMiddlewares(db: Sequelize) {
    //const mySessionStore = new SequelizeStore({db: db});
    //Cookie settings
    const sess: SessionOptions = {
      secret: SECRET_KEY,
      cookie: {secure: false, 
              //sameSite: 'none',
              //maxAge: 1000 * 60 * 60 * 24
            },
      store: new SequelizeStore({
        db: db,
      }),
      resave: false,
      saveUninitialized: false,
      unset: 'destroy'
    }
    
    this.app.use(fileUpload());
    this.app.use(json({ limit: '5mb' }));
    this.app.use(urlencoded({ limit: '5mb', extended: true }));
    //app.use('/api-docs', serve, setup(openapiSpecification));
    this.app.use(cors({ credentials: CREDENTIALS, origin: ORIGIN, exposedHeaders: ['set-cookie'] }));
    this.app.use('/static', express.static('public'))

    //If production set secure
    if (this.app.get('env') === 'production') {
      this.app.set('trust proxy', 1) // trust first proxy
      sess.cookie.secure = true // serve secure cookies
    }
    this.app.use(session(sess))
    
    //mySessionStore.sync();
    this.app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Origin', ORIGIN );
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', "X-Requested-With, Origin, Content-Type, Accept");
      next();
    });
  }

  private initializeRoutes(routes) {
    routes.forEach(route => {
        this.app.use('/', route.router);
    });
    // Global error handling
    this.app.use(function (req, res) {
      res.status(404).json({ error: 'Route Not found' });
    });
  }

  public async listen() {
    console.log(this.port);
    console.log(SECRET_KEY)
    console.log(PORT)
    
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: ${this.env} =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }
}

export default App;