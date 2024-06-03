import { Router } from 'express';
import { UserController } from '../controllers';
import { UserRepository } from '../repositories';
import { IRoute } from '../interfaces';
import { authMiddleware } from '../middlewares/auth.middleware';
import { BASEPATH } from '../config';

class UsersRoute implements IRoute {
  public path = BASEPATH + 'users/';
  public router = Router();
  public repository = new UserRepository();
  public controller = new UserController( this.repository );

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}logout`, [authMiddleware.verifyToken], this.controller.logout);
    this.router.get(`${this.path}`, [authMiddleware.verifyToken], this.controller.listAllUsers);
    this.router.post(`${this.path}login`, this.controller.signin);
  }
}

export default UsersRoute;