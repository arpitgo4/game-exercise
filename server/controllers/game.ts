
/**
 * Controller layer
 *
 * Interacts with model and business logic for
 * the request goes here.
 */

import { promisify } from 'util';
import request, { Request, Response } from 'request';
import uuid from 'node-uuid';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];

import {
    User
} from '../models';

import * as utils from '../utils/utils';
import { IUserModel, IGameModel } from 'Models';
import { userCtrl } from './';
import { CustomError } from 'Interfaces';
import * as constants from '../utils/constants';



export const getGame = (user_id: string, game_id: string): Promise<IGameModel> => {
    return User.findOne({ user_id, 'games.game_id': game_id }, { games: { $elemMatch: { game_id } } })
    // @ts-ignore
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({ message: `invalid user` });

        if (user.games.length === 0)
            return Promise.reject({ message: `invalid game` });

        return user.games[0];
    });
};

export const startGame = (user_id: string) => {
    return userCtrl.getUser(user_id, { games: false, })
    .then((user: IUserModel) => {
        const { last_game_timestamp, game_counter, } = user.meta;
        const last_game_date = utils.getDate(last_game_timestamp);
        const current_date = utils.getDate(utils.getUnixTimeStamp());

        if (last_game_date === current_date && game_counter >= 10)
            return  Promise.reject({ message: `Only 10 games for a day! Try tomorrow` });

        const new_game = {
            game_id: uuid.v4(),
            score: -1,
        };

        if (last_game_date === current_date) {
            return User.updateOne(
                { user_id },
                {
                    $inc: { 'meta.game_counter': 1 },
                    $push: { games: new_game },
                    $set: { 'meta.last_game_timestamp': utils.getUnixTimeStamp() }
                },
                { new: true, },
            )
            .then((update) => {
                return new_game;
            });
        }

        if (last_game_date < current_date) {
            return User.updateOne(
                { user_id },
                {
                    $set: { 'meta.game_counter': 1, 'meta.last_game_timestamp': utils.getUnixTimeStamp() },
                    $push: { games: new_game }
                },
                { new: true, },
            )
            .then((update) => {
                return new_game;
            });
        }
    });
};


export const endGame = (user_id: string, game_id: string, score: number) => {
    return getGame(user_id, game_id)
    .then((game: IGameModel) => {
        if (game.score !== -1)
            return Promise.reject({ message: `game already played!` });

        return Promise.resolve();
    })
    .then(() => {
        return User.findOneAndUpdate(
            { user_id, 'games.game_id': game_id, },
            { $set: { 'games.$.score': score, }, $max: { 'meta.highest_score': score, } },
            {
                new: true,
                select: {
                    games: { $elemMatch: { game_id } }
                }
            }
        );
    })
    // @ts-ignore
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({ message: `invalid user` });

        if (user.games.length === 0)
            return Promise.reject({ message: `invalid game` });

        return user.games[0];
    });
};