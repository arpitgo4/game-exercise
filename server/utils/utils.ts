
import jsonWebToken from 'jsonwebtoken';
import chalk from 'chalk';
import bcrypt from 'bcryptjs';

import { IUserModel } from 'Models';
import { USER_JWT_TOKEN_TTL } from './constants';


const UUIDv4_REG_EXP = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const isValidUUIDv4 = (uuidStr: string) => UUIDv4_REG_EXP.test(uuidStr);

export const getUnixTimeStamp = () => Math.floor(new Date().getTime() / 1000);

const SALT_ROUNDS = 13;

/**
 * $2y$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 * |  |  |                     |
 * |  |  |                     hash-value = K0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa
 * |  |  |
 * |  |  salt = nOUIs5kJ7naTuTFkBy1veu
 * |  |
 * |  cost-factor = 10 = 2^10 iterations
 * |
 * hash-algorithm = 2y = BCrypt
 */
export const generateHash = (password: string): Promise<string> => {
    return bcrypt.hash(password, SALT_ROUNDS)
    .catch(err => {
        console.log(`[generateHash] Error generating the hash of: ${password}`);
        return Promise.reject(err);
    });
};

export const comparePassword = (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
    .catch(err => {
        console.log('error', err);
        console.log(`[comparePassword] Error comparing the passwords: ${password}, hash: ${hashedPassword}`);
        return Promise.reject(err);
    });
};

export const generateUserJWToken = (user: IUserModel, expireTime: string = USER_JWT_TOKEN_TTL): Promise<string> => {
    const { JWT_SECRET, } = process.env;

    const token_payload: any = { username: user.username, user_id: user.user_id };

    const options = {
        expiresIn: expireTime
    };

    return Promise.resolve(jsonWebToken.sign(token_payload, JWT_SECRET, options));
};

export const getDate = (timestamp: number): number => {
    const date = new Date(timestamp * 1000);
    return date.getDate();
};

function test() {

}
