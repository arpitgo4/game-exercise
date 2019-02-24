
/**
 * Route layer.
 *
 * Route the API calls to controllers and send the
 * response back.
 */


import userRouter from './user';
import authRouter from './auth';
import gameRouter from './game';

export {
    userRouter,
    authRouter,
    gameRouter,
};
