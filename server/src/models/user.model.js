const {
    Schema,
    model
} = require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    avatar: {
        type: String,
        default: "default_avatar.png"
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false 
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: "Role"
    }],
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    posts : [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
}, {
    timestamps: true
});


const User = model("User", userSchema)

module.exports = User