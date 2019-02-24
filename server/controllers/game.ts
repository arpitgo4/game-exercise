
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