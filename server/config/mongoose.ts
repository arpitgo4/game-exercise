
import mongoose from 'mongoose';
import chalk from 'chalk';

const { MONGO_HOST, MONGO_DB_NAME, } = process.env;

const DB_CONN_URL = `mongodb://${MONGO_HOST}/${MONGO_DB_NAME}`;

const CONN_CONF = {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    bufferMaxEntries: 0
};

const connection = mongoose.connect(DB_CONN_URL, CONN_CONF, err => {
    console.log(DB_CONN_URL);
    if (err)
        console.log(chalk.red(`[mongoose] error connecting to mongodb: ${err.message}`)); // @ts-ignore
    else console.log(chalk.green('[mongoose] mongodb connected'));
});

mongoose.Promise = global.Promise;

module.exports = {
    connection
};