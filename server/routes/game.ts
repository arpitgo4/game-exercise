
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

// api to start the game
router.post('/', (req: JWTRequest, res: Response, next: NextFunction) => {

});

// api to update the score of game
router.put('/', (req: JWTRequest, res: Response, next: NextFunction) => {

});


export default router;