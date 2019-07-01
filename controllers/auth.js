const User = require('../models/user').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const authorize = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await  User.findOne({ username: username });
        if(await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({
                id: user._id
            }, config.secret);
            res.status(200).json({
                message: 'Login Success',
                token: token
            });
        }   
    } catch (error) {
        res.status(401).json({
            error: true,
            message: 'Wrong credentials entered..Please try again'
        })
    }
};

module.exports = {
    authorize
};
