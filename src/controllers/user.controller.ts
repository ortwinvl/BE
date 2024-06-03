import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces';
import { UserRepository } from '../repositories';
import { logger } from '../services/logger.service';

class UserController {
    public repository: UserRepository;

    constructor(Repository) {
        this.repository = Repository;
    }

    public listAllUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData = await this.repository.listAllUsers(req.organisationId);
            if (findAllUsersData.result == 1) {
                res.status(200).json(findAllUsersData);
            }
            else
                res.status(500).json(findAllUsersData);

        } catch (error) {
            next(error);
        }
      };

    public signin = async (req: RequestWithUser, res: Response) => {
        try {
            const r = await this.repository.loginUser(req.body.email, req.body.password);
            if (r.result == 1) {
                const user = {
                    accessToken: r.data.accessToken,
                    expiresAt: r.data.expiresAt,
                    ipaddress: req.ip
                }
                
                //set cookie information only if not MFA
                req.session.user = user;
                const ret = {result: 1, data: {
                    id: r.data.user.id,
                    name: r.data.user.name,
                    firstname: r.data.user.firstname, 
                    email: r.data.user.email,
                    language: r.data.user.languageid?.value,
                    role: r.data.user.role,
                    expiresAt: r.data.expiresAt,
                    accessToken: r.data.accessToken }
                };
                res.status(200).json(ret);
            }
            else {
                res.status(403).json(r);
            }
        } catch (error) {
            logger.error(error.message);
            res.status(500).json({ result: -1, error: error.message });
        }
    };

    public logout = async(req: RequestWithUser, res: Response, next: NextFunction) => {
        // clear the user from the session object and save.
        // this will ensure that re-using the old session id
        // does not have a logged in user
        req.session.user = null
        req.session.save(function (err) {
            if (err) next(err)

            req.session.regenerate(function (err) {
                if (err) next(err)
                res.status(200).json({result: 1, data: {message: "logged out"}});
            })
            
        })
    }
}

export default UserController;