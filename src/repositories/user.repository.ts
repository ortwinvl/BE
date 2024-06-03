/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "../models"
import db from '../db'
import { QueryTypes } from "sequelize";
import { IReturnType } from '../interfaces';
import bcrypt from 'bcryptjs';
import jsonwebtoken  from "jsonwebtoken";
import { SECRET_KEY } from '../config';
import _ from "lodash";
import { TokenData } from "interfaces/auth.interface";
import moment from "moment";
import { logger } from "../services/logger.service";

class UserRepository {
    // listAllUsers for one organisation function
    public async listAllUsers(organisationId): Promise<IReturnType> {
        const users = await db.query(`Select u.id, u.name, u.firstname, u.email, u.role, u.language, r.value as rolevalue, l.value as languagevalue
        from [user] as u inner join [enum] as r on u.role = r.id
        inner join [enum] as l on u.language = l.id
        where organisation = :organisation`,
        {
            type: QueryTypes.SELECT,
            replacements: { 'organisation' : organisationId}
        })
            .then((result) => {
                return { result: 1, data: result };
            },
                (err) => {
                    return {
                        result: -1,
                        error: err.message
                    }
                }
            )
        return users;
    }

    // Find a user by email
    public async findOneUserByEmail(userEmail: string) : Promise<IReturnType> {
        const user = await User.findOne({ where: {
            email: userEmail
        }})
            .then((result) => {
                if (result === null ) {
                    return {
                        result: -1,
                        error: "UserNotFound"
                    }
                }
                return {
                    result: 1, data: result
                };
            },
                (err) => {
                    return {
                        result: -1,
                        error: err.message
                    }
                }
            )

        if (user && user.result == 1) {
            return user;
        }
        else {
            return {
                result: -1,
                error: "UserNotFound"
            }
        }
    }


    async loginUser(email: string, pwd: string) : Promise<IReturnType> {
        const user = await User.findOne({ where: { email: email } });
        
        if (user)  {
            if (user == null) return {
                result: -1,
                error: "User not found"
            }
            
            const passwordIsValid = await bcrypt.compare(pwd, user.password);
            if (!passwordIsValid) {
                return { result: -1, error:  "NoPWDMatch"};
            }
            //Pwd is correct
            const tokendata = await this.generateAccessToken(user);
            
            const usertoreturn = await User.findOne({ where: { id :user.id}, attributes: { exclude: ['password', 'mfa', 'mfadate', 'active'] }});
            return { result: 1, 
                    data: { ...tokendata, user: usertoreturn } 
                };
        }
        else {
            return { result: -1, error: "UserUnKnown" };
        }
    }

    async generateAccessToken(user) : Promise<TokenData> {
        //Pwd is correct
        const token = await jsonwebtoken.sign({ id: user.id, organisation: user.organisation, role: user.role }, SECRET_KEY, {
            expiresIn: '24h'
        });
        const expiresat = new Date();
        expiresat.setHours(expiresat.getHours() + 24);

        return { 
                accessToken: token,
                expiresAt: expiresat
        };
    }

    generateHashedpassword(pwd: string): Promise<any> {
        const SALT_WORK_FACTOR = 10;
        // generate a salt
        const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        const hash = bcrypt.hashSync(pwd, salt);

        return hash;
    }
}
export { UserRepository };