
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */

import chalk from 'chalk';

const router = require('express').Router();
import { Request, Response, NextFunction } from 'express';

import * as controllers from '../controllers';
import * as constants from '../utils/constants';
import * as utils from '../utils/utils';

import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { userCtrl } from '../controllers';
import { IUserModel } from 'Models';


router.get('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { user_id } = req.user;

    userCtrl.getUser(user_id)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user.user_id,
                attributes: user
            }
        });
    })
    .catch((err: CustomError) => {
        next(err);
    });
});


export default router;