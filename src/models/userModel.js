const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uniqueValidator = require("mongoose-unique-validator");
// const task = require('./task');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid")
            }

        }
    },
    password: {
        type: String,
        requried: true,
        minlength: 7,
    },
    role: {
        type: String,
        required: true,
    }
    // age: {
    //     type: Number,
    //     default: 0,
    //     validate(value) {
    //         if (value < 0) {
    //             throw new Error("Age must be positive number")
    //         }
    //     }
    // },

    // avatar: {
    //     type: Buffer
    // }
}, {
    timestamps: true,

})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'author'
// })
userSchema.methods.toJSON = function () {
    const user = this;
    const userObj = user.toObject()
    delete userObj.password;
    return userObj;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    // console.log(user)
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: 86400 }); //24 hours
    // user.tokens = user.tokens.concat({ token })

    // await user.save()
    return token;

}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Unable to Login")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Unable to Login")
    }
    return user;
}
// hash the plain password before save
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

// userSchema.pre('remove', async function (next) {
//     const user = this
//     await task.deleteMany({ author: user._id })

//     next();
// })
userSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);

module.exports = User;