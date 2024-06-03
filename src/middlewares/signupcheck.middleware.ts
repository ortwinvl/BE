import { NextFunction, Response, Request } from 'express';
import { User } from "../models";
import { Op } from 'sequelize';

//const User = db.user;
//const Relation = db.relation;

const checkDuplicateUsernameOrEmail = async (req: Request, res: Response, next: NextFunction) =>{
    // Email
    let u = null;
    if (req.body.id) {
        u = await User.findOne({ where: {email: req.body.email, [Op.not] : {id: req.body.id }}});
    }
    else{
        u = await User.findOne({where :{email: req.body.email}});
    }
    if (u) {
        res.status(400).send({ result: "-1", error: "DuplicateEmail" });
        return;
    }
    next();
};

// function checkDuplicateRelation(req, res, next){
//     // Email
//     Relation.findOne({
//         email: req.body.email,
//         organisation: req.organisationId
//     }).exec((err, user) => {
//         if (err) {
//             res.status(203).send({ result: "-1", error: err });
//             return;
//         }
//         if (user) {
//             res.status(400).send({ id: "-1", error: "Failed! Email is already in use!" });
//             return;
//         }
//         next();
//     });
// };

// function checkRolesExisted(req, res, next){
//     if (req.body.roles) {
//         for (let i = 0; i < req.body.roles.length; i++) {
//             if (!ROLES.includes(req.body.roles[i])) {
//                 res.status(400).send({
//                     id: -1, error: `Failed! Role ${req.body.roles[i]} does not exist!`
//                 });
//                 return;
//             }
//         }
//     }
//     next();
// };

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    // checkDuplicateRelation,
    // checkRolesExisted
};

export { verifySignUp };