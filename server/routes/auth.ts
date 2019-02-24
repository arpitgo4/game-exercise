
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */

import chalk from 'chalk';

const router = require('express').Router();
import { Response, NextFunction, } from 'express';

import * as constants from '../utils/constants';
import * as utils from '../utils/utils';

import { IUserModel } from '../types/Models';
import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { userCtrl } from '../controllers';


router.post('/token', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { username, password } = req.body.data.attributes;

    return userCtrl.getUserByAuth(username, password)
    .then((user: IUserModel) => utils.generateUserJWToken(user))
    .then((jwToken: string) => {
        res.status(200).json({
            meta: {
                token: jwToken
            }
        });
    })
    .catch((err: CustomError) => {
        res.status(400).json({
            errors: [{ message: err.message }]
        });
        next(err);
    });
});


export default router;