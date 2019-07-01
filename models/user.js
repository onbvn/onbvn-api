const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

/**
 * @swagger
 * definition:
 *    user:
 *        properties:
 *          name:
 *            type: string
 *          username:
 *            type: string
 *          email:
 *            type: string
 *          mobileNumber:
 *            type: string
 *          profilePicture:
 *            type: string
 *          password:
 *            type: string
 *          aadharUID:
 *            type: string
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    aadharUID: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.pre("save", async function (next) {
    if(!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 8)
    } catch (err) {
        return next(err);
    }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
    if(this.getUpdate().password === undefined) return next();
    try {
        this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, 8)
    } catch (err) {
        return next(err);
    }
});

module.exports = {
    User: mongoose.model('User', UserSchema)
};