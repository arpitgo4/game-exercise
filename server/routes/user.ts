
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
    userCtrl.getUsers()
    .then((users: Array<IUserModel>) => {
        res.status(200).json({
            data: users.reduce((acc, user) => [ ...acc, {
                type: 'user',
                id: user._id,
                attributes: user
            } ], [])
        });
    })
    .catch((err: CustomError) => {
        res.status(400).json({
            errors: [ { message: err.message } ]
        });
        next(err);
    });
});

router.get('/:id', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { id } = req.params;

    userCtrl.getUser(id)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: user
            }
        });
    })
    .catch((err: CustomError) => {
        res.status(400).json({
            errors: [ { message: err.message } ]
        });
        next(err);
    });
});

router.post('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const user = req.body.data.attributes;

    userCtrl.createUser(user)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: user
            }
        });
    })
    .catch((err: CustomError) => {
        res.status(400).json({
            errors: [ { message: err.message } ]
        });
        next(err);
    });
});

router.put('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const user = req.body.data.attributes;

    userCtrl.updateUser(user)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: user
            }
        });
    })
    .catch((err: CustomError) => {
        res.status(400).json({
            errors: [ { message: err.message } ]
        });
        next(err);
    });
});

router.delete('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const user = req.body.data.attributes;

    userCtrl.removeUser(user._id)
    .then((user: IUserModel) => {
        res.status(200).json({
            data: {
                type: 'user',
                id: user._id,
                attributes: user
            }
        });
    })
    .catch((err: CustomError) => {
        res.status(400).json({
            errors: [ { message: err.message } ]
        });
        next(err);
    });
});


export default router;