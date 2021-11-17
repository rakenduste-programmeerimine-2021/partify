require("dotenv").config()
const mongoose = require('mongoose')

// Options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
};

// Environment variables
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DB,
} = process.env;

const dbConnectionURL = {
    'LOCAL_DB_URL': `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@mongo/${MONGO_DB}?authSource=admin`,
};

mongoose.connect(dbConnectionURL.LOCAL_DB_URL, options)
const dbStatus = mongoose.connection;

dbStatus.on('error',(err) => {
    console.log(err)
})
dbStatus.once('open', () => {
    console.log("Mongo connected!")
})
