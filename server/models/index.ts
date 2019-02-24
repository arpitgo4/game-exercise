
/**
 * Model layer.
 *
 * Interacts with MongoDB.
 */

const DB_CONN = require('../config/mongoose');

import chalk from 'chalk';
import { mongoDBEventEmitter } from '../utils/event-emitters';

import { User, userSchema, } from './User';

import * as utils from '../utils/utils';
import * as constants from '../utils/constants';
import { CustomError } from 'Interfaces';
import { IUserModel } from 'Models';

// initialization for the mongodb will go here...
function init() {
    const { userCtrl, } = require('../controllers');

    const admin_promise = User.findOne({ username: 'admin' })
    .then((user: IUserModel) => {
        if (!user)
            return userCtrl.createUser({
                username: 'admin',
                password: 'admin',
                email: 'admin@gmail.com',
            });

        return Promise.resolve();
    });

    return Promise.all([ admin_promise, ])
    .then(() => console.log(chalk.green.bold(`[mongoose] Admin user created! username: 'admin', password: 'admin'`)))
    .then(() => mongoDBEventEmitter.emit('ready', '[mongoose] Connection with MongoDB done'))
    .catch((err: CustomError) => mongoDBEventEmitter.emit('error', `[mongoose] Error creating connection with MongoDB: ${err.message}`));
}

setImmediate(init, 0);

export {
    User,
};
