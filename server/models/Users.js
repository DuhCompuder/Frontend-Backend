const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    account: {
        type: Number,
        required: true,
    },
    isMember: {
        type: Boolean,
        required: true,
    }
});

const UserModel = mongoose.model("userinfos", UserSchema)
module.exports = UserModel;