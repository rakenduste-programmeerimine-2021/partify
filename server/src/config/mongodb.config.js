require("dotenv").config()
const db = require("../models");
const Role = db.role;
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

exports.initial = function () {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
module.exports = dbConnectionURL, options