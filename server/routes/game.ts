
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */

import chalk from 'chalk';

const router = require('express').Router();
import { Request, Response, NextFunction } from 'express';

import { gameCtrl, } from '../controllers';
import * as constants from '../utils/constants';
import * as utils from '../utils/utils';

import { JWTRequest, CustomError } from '../types/Interfaces.d';
import { userCtrl } from '../controllers';
import { IUserModel, IGameModel } from 'Models';


// api to start the game
router.post('/', (req: JWTRequest, res: Response, next: NextFunction) => {
    const { user_id, } = req.user;

    gameCtrl.startGame(user_id)
    .then((game: IGameModel) => {
        res.status(200).json({
            data: {
                type: 'game',
                id: game.game_id,
                attributes: game
            }
        });
    })
    .catch((err: CustomError) => next(err));
});

// api to update the score of game
router.put('/', (req: JWTRequest, res: Response, next: NextFunction) => {

});


export default router;