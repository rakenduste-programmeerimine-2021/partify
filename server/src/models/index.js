const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.post = require("./post.model");
db.role = require("./role.model");
db.vote = require("./vote.model");
db.comment = require("./comment.model");

db.ROLES = ["user", "admin"];

module.exports = db;