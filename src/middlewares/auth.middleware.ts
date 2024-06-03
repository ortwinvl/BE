import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { RequestWithUser } from '../interfaces/auth.interface';
import { User } from "../models";
import { logger } from '../services/logger.service';

// const verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
//   try {
//     if (req.session && req.session.user) {
//       if (req.session.user.ipaddress != req.ip) {
//         //res.status(401).json({result: -1, data: {message: `Wrong ip: cookieip: ${req.session.user.ipaddress} requestip: ${req.ip}`}});
//         logger.info(`Wrong ip: cookieip: ${req.session.user.ipaddress} requestip: ${req.ip}`)
//         //return;
//       }
//       const verificationResponse = (await checkToken(req.session.user.accessToken));
//       if (verificationResponse && verificationResponse.result == 0 ) {
//         req.organisationId = verificationResponse.organisation;
//         req.userId = verificationResponse.id;
//         req.role = verificationResponse.role;
//         next();
//       } 
//       else {
//         res.status(401).json({result: -1, data: verificationResponse});
//       }
//     } else {
//         const Authorization = req.headers["x-access-token"];
//         if (Authorization) {
//           const verificationResponse = (await checkToken(Authorization));
//           if (verificationResponse && verificationResponse.result == 0 ) {
//             req.organisationId = verificationResponse.organisation;
//             req.userId = verificationResponse.id;
//             req.role = verificationResponse.role;
//             next();
//           } 
//           else {
//             res.status(401).json({result: -1, data: verificationResponse});
//           }
//        } 
//        else {
//         const headers = JSON.stringify(req.headers);
//         logger.info(`Authentication token missing req : ${headers}`);
//         const test = JSON.stringify(req.session);
//         logger.info(`Authentication token missing req.session: ${test}`);
//         res.status(401).json({result: -1, data: {message: "Authentication token missing"}});
//        }
//     }
//   } catch (error) {
//     res.status(401).json({result: -1, data: {message: "Wrong authentication token " + error.message}});
//   }
// };

const verifyToken = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.session && req.session.user) {
      if (req.session.user.ipaddress != req.ip) {
        //res.status(401).json({result: -1, data: {message: `Wrong ip: cookieip: ${req.session.user.ipaddress} requestip: ${req.ip}`}});
        logger.info(`Wrong ip: cookieip: ${req.session.user.ipaddress} requestip: ${req.ip}`)
        //return;
      }
      const verificationResponse = (await checkToken(req.session.user.accessToken));
      if (verificationResponse && verificationResponse.result == 0 ) {
        req.organisationId = verificationResponse.organisation;
        req.userId = verificationResponse.id;
        req.role = verificationResponse.role;
        next();
      } 
      else {
        res.status(401).json({result: -1, data: verificationResponse});
      }
    } else {
      const headers = JSON.stringify(req.headers);
      logger.info(`Authentication token missing req : ${headers}`);
      const test = JSON.stringify(req.session);
      logger.info(`Authentication token missing req.session: ${test}`);
      res.status(401).json({result: -1, data: {message: "Authentication token missing"}});
    }
  } catch (error) {
    res.status(401).json({result: -1, data: {message: "Wrong authentication token " + error.message}});
  }
};

async function checkToken(token) {
    try {
        const r = await verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return { result: -1, error: `Unauthorized : ${err}` };
            }
            return { result: 0, id: decoded['id'], organisation: decoded['organisation'] , role: decoded['role']};
        });
        return r;

    } catch (error) {
        logger.error("checkToken: " + error.message);
        return { result: -2, error: error };
    }
}

const isAdmin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const u = await User.findByPk(req.userId);
  if (u && u.role) {
    next();
    return;
  }
  res.status(403).send({ id: -1, error: "Require Admin Role!" });
  return;
 };

 const isBackOffice = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const u = await User.findByPk(req.userId);
  
  if (u && u.role) {
    next();
    return;
  }
  res.status(403).send({ id: -1, error: "Require BackOffice Role!" });
  return;
 };

const authMiddleware = {
     verifyToken,
     checkToken,
     isAdmin,
     isBackOffice
};

 export { authMiddleware };