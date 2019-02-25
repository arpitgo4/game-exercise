
import { Document, } from 'mongoose';

export interface IUserModel extends Document {
    user_id: string;
    username: string;
    password: string;
    email: string;
    games: Array<IGameModel>;
    meta: {
        created_at: number;
        game_counter: number;
        highest_score: number;
        last_game_timestamp: number;
    };
}

export interface IGameModel extends Document {
    game_id: string;
    score: number;
    meta: {
        created_at: number;
    }
}