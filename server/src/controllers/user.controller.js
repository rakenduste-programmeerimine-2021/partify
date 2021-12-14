const db = require("../models");
const User = db.user;
const Post = db.post;
const Vote = db.vote;
var fs = require('fs')
const {
    authJwt
} = require("../middleware");



// Checks if id is in valid form, returns user information
exports.userProfile = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const userId = req.params.id
            const user = await User.findById(userId).populate("roles posts")
            if (!user) res.status(500)
            res.status(200).send(user);

        } else {
            res.status(404).send("User not found!")
        }
    } catch (e) {
        console.log(e)
        res.status(500)
    }

};

exports.updateUser = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            var id = req.params.id
            const checkEmail = await User.findOne({email:req.body.email})
            if(checkEmail){
                console.log(checkEmail._id + " " + id)
                if (checkEmail._id != id) res.status(400).send("Email taken")
            }
            const checkUname = await User.findOne({userName:req.body.userName})
            if(checkUname){
                if (checkUname._id != id) res.status(400).send("Username taken")
            }
            const oldUser = await User.findById(id)
            var hasAdmin = await authJwt.isUserAdminBool(id)
            if (!oldUser) res.status(404).send("No user with that id found")
            if (oldUser._id.toString() === id || hasAdmin) {
                const newUser = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userName: req.body.userName,
                    email: req.body.email,
                    phone: req.body.phone,
                    gender: req.body.gender,
                }
                const updatedUser = await User.findByIdAndUpdate(id, newUser)
                res.status(200).send('User updated!')
            } else {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
        } else {
            res.status(404).send("User not found!")
        }
    } catch (e) {
        res.status(500)
    }
}

exports.updateUserAvatar = async (req, res) => {
    try {
        console.log(req.file)
        if (req.file) {
            const originalName = req.file.originalname
            const fileExtension = originalName.split('.').pop()
            const filePath = req.file.path
            const fullFileName = filePath + '.' + fileExtension;
            // Adds file extension to saved file.
            fs.readFile(req.file.path, (err, contents) => {
                if (err) {
                    console.log('Error: ', err);
                } else {

                    fs.rename(filePath, fullFileName, (err) => {
                        if (err) throw err;
                    });
                }
            });
            if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                var id = req.params.id
                const user = await User.findById(id)
                var hasAdmin = await authJwt.isUserAdminBool(id)
                if (!user) res.status(404).send("No user with that id found")
                if (user._id.toString() === id || hasAdmin) {
                    const userAvatar = {
                        avatar: fullFileName
                    }
                    const updatedUser = await User.findByIdAndUpdate(id, userAvatar)
                    res.status(200).send('User updated!')
                } else {
                    return res.status(401).send({
                        message: "Unauthorized!"
                    });
                }
            } else {
                res.status(404).send("User not found!")
            }
        } else {
            res.status(400).send("No file!")
        }
    } catch (e) {
        res.status(500)
    }
}


exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            var id = req.params.id
            const user = await User.findById(id)
            const hasAdmin = await authJwt.isUserAdminBool(id)
            if (!user) res.status(404).send("No user with that id found")
            if (user._id.toString() === id || hasAdmin) {
                if (user.avatar !== "default_avatar.png") {
                    try {
                        fs.unlink(user.avatar, function (err) {
                            if (err) console.log("file not found")
                        });
                        console.log('File deleted!');
                    } catch (e) {
                        res.status(500)
                    }
                }
                user.delete();
                res.status(200).send("user deleted")

            } else {
                return res.status(401).send({
                    message: "Unauthorized!"
                });
            }
        } else {
            res.status(404).send("User not found!")
        }
    } catch (e) {
        return res.status(500)
    }
}


exports.adminBoard = async (req, res) => {
    try {
        const users = await User.find({}).populate("roles posts")
        if (!users) res.status(404).send("No users found???")
        else res.status(200).send(users)
    } catch (e) {
        res.status(500)
    }
};