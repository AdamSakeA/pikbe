// import User from '../models/userModel.js'
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt'
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userLogin = async (req,res) => {
    const { email, password } = req.body;

    const findUser = await User.findOne({
        email : email,
    })

    if(!findUser) {
        return res.status(400).json({
            message: "Email not found"
        })
    }

    const isPasswordValid = bcrypt.compareSync(password, findUser.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Wrong password"
        })
    }
    
    const userId = findUser._id; 
    const name = findUser.namalengkap;
    const accessToken = jwt.sign({userId, email, name}, process.env.ACCESS_TOKEN_SECRET 
        ,{
        expiresIn: '20s'
        }
        )
    const refreshToken = jwt.sign({userId, email, name}, process.env.REFRESH_TOKEN_SECRET 
        ,{
        expiresIn: '1d'
         }
    )
    await User.updateOne({refresh_token: refreshToken}, userId);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, userId, name })
}

const getUserLoginById = async (req, res) => {
    try {
        const userLogin = await User.findById(req.params._id);
        res.json(userLogin)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// export { userLogin, getUserLoginById };
exports.userLogin = userLogin;
exports.getUserLoginById = getUserLoginById;