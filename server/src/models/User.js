const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true},
    avatar: { type: String, default: "default_avatar.png"},
    gender: { type: String, enum : ['Male', 'Female', 'Other'], required: true},
    dateOfBirth : { type: Date, required: true},
    password: { type: String, required: true },
}, {timestamps: true});

const User = model("User", userSchema)

module.exports = User