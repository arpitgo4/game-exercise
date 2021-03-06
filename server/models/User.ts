
import mongoose from 'mongoose';
import uuid from 'node-uuid';

import * as constants from '../utils/constants';
import { getUnixTimeStamp } from '../utils/utils';

import { IUserModel } from '../types/Models.d';

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    game_id: { type: String, default: uuid.v4, },
    score: { type: Number, default: -1, },      // -1: game discontinued in between
    meta: {
        created_at: { type: Number, default: getUnixTimeStamp },
    }
});

const userSchema = new Schema({
    user_id: { type: String, default: uuid.v4 },
    username: { type: String, required: true, },
    password: { type: String, required: true },
    games: { type: Array(gameSchema), default: [], },
    meta: {
        created_at: { type: Number, default: getUnixTimeStamp },
        game_counter: { type: Number, default: 0, },
        highest_score: { type: Number, default: 0 },
        last_game_timestamp: { type: Number, default: 0, },
    }
});

const User: mongoose.Model<IUserModel> = mongoose.model<IUserModel>('users', userSchema);

export {
    User,
    userSchema
};