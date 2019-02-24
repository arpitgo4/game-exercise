
import { Document, } from 'mongoose';

export interface IUserModel extends Document {
    user_id: string;
    username: string;
    password: string;
    email: string;
}