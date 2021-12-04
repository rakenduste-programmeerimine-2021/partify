
require("dotenv").config()
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const {
    LOCAL_DB_URL,
    initial,
    options
} = require('../config/mongodb.config')

mongoose.connect(LOCAL_DB_URL, options);

mongoose.connection
    .once('open', () => {
        initial
        console.log('Connected!')
    })
    .on('error', (error) => {
        console.warn('Error : ', error);
    });

// runs before each test
beforeEach((done) => {
    mongoose.connection.collections.users.drop();
    mongoose.connection.collections.comments.drop(() => {
        done();
    })
});