const User = require('../models/user').User;

const create = async (req, res) => {
    let {
        name,
        username,
        mobileNumber,
        email,
        password,
        profilePicture,
        aadharUID
    } = req.body;
    try {
        const user = new User({
            name: name,
            username: username,
            mobileNumber: mobileNumber,
            email: email,
            password: password,
            profilePicture: profilePicture,
            aadharUID: aadharUID
        });
        await user.save();
        return res.status(201).json({
            id: user._id,
            name: user.name,
            username: user.username,
            mobileNumber: user.mobileNumber,
            email: user.email,
            profilePicture: user.profilePicture
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Could not create user...Please try again later'})
    }
};

const getAll = async (req, res) => {
    try {
        return res.status(200).json( await User.find({}).select('name username mobileNumber email profilePicture'));
    } catch (error) {
        return res.status(error.status).json({
            error: true,
            message: 'Something went wrong..Please try again later'
        });
    }
};

const findUser = async (req, res) => {
    try {
        return res.status(200).json(await User.findOne({
            _id: req.params.userID
        }).select('username name mobileNumber email profilePicture'))
    } catch (error) {
        return res.status(error.status).json({
            error: true,
            message: 'Something went wrong...Please try again later'
        });
    }
};

const updateUser = async (req, res) => {
    let userID = req.params.userID;
    let user = req.body;
    try {
        res.status(200).json(await User.findOneAndUpdate({
            _id: userID
        }, user, { new: true }).select('username name mobileNumber email profilePicture'))
    } catch (error) {
        res.status(error.status).json({
            error: true,
            message: 'Something went wrong...Please try again'
        })
    }
};

const deleteUser = async (req, res) => {
    let userID = req.params.userID;
    try {
        res.status(200).json(await User.findOneAndDelete({
            _id: userID
        }))
    } catch (error) {
        res.status(error.status(200).json({
            error: true,
            message: 'Something went wrong...Please try again later'
        }))
    }
};

module.exports = {
    create,
    getAll,
    findUser,
    updateUser,
    deleteUser
};
