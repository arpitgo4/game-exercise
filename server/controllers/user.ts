
/**
 * Controller layer
 *
 * Interacts with model and business logic for
 * the request goes here.
 */

import { promisify } from 'util';
import request, { Request, Response } from 'request';

const [ request_get, request_post, request_put ] = [
    promisify(request.get),
    promisify(request.post),
    promisify(request.put)
];

import {
    User
} from '../models';

import * as utils from '../utils/utils';
import { IUserModel } from 'Models';


export const getUser = (user_id: string, projection: object = {}): Promise<IUserModel> => {
    return User.findOne({ user_id }, projection)
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({
                message: `user not found ${user_id}`
            });

        user = user.toObject();
        delete user.password;

        return user;
    });
};

export const getUserByAuth = (username: string, password: string): Promise<IUserModel> => {
    return User.findOne({ username })
    .then((user: IUserModel) => {
        if (!user)
            return Promise.reject({ message: `username: ${username} do not exists`});
        return Promise.resolve(user);
    })
    .then((user: IUserModel) => Promise.all([ utils.comparePassword(password, user.password), user ]))
    .then(([ passwordMatched, user ]: [ any, IUserModel ]) => {
        if (!passwordMatched)
            return Promise.reject({
                message: `username/password may be incorrect`
            });

        delete user.password;

        return Promise.resolve(user);
    });
};

export const createUser = (user: IUserModel): Promise<IUserModel> => {
    return utils.generateHash(user.password)
    .then((hashed_password: string) => {
        const new_user = Object.assign({}, user, {
                            username: user.username,
                            password: hashed_password,
                        });

        return User.create(new_user);
    })
    .then((user: IUserModel) => {
        user = user.toObject();
        delete user.password;

        return user;
    });
};