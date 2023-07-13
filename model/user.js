const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    twitter: {
        type: String,
        trim: true
    },
    insta: {
        type: String,
        trim: true
    }
}) 

const options = {
    usernameUnique: true
}

userSchema.plugin(passportLocalMongoose, options);


const User = new mongoose.model('User',userSchema);
module.exports = User;