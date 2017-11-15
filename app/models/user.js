const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
var SALT = 13;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type:String,
        required: true
    },
    tech: {
        type:String,
        required: true
    },
    admin: {
        type: String,
        default: false
    },
    RDP: []
});

userSchema.pre('save', function(next) { 
    var u = this;
    // only hash the password if it has been modified (or is new)
    if (!u.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
        bcrypt.hash(u.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            u.password = hash;
            next();
        })
    })
});


var User = mongoose.model('User', userSchema);

module.exports = User;