// import User from '../models/userModel.js';
// import AdminUser from '../models/adminModel.js';
// import jwt from 'jsonwebtoken';

const AdminUser = require('../models/adminModel.js');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');


exports.refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        const byId = req.params.id;
        if(!refreshToken) return res.sendStatus(401);

        const findUser = await User.findOneAndUpdate({
            refresh_token: refreshToken,
        })

        if(!findUser) return res.sendStatus({ refreshToken })
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = findUser._id;
            const nama = findUser.namalengkap;
            const email = findUser.email;

            const accessToken = jwt.sign({ userId, nama, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken, nama, email })
        })
    } catch (error) {
        console.log(error);
    }
}

exports.refreshTokenAdmin = async(req,res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);

        const findAdminUser = await AdminUser.findOneAndUpdate({
            refresh_token: refreshToken,
        })

        if(!findAdminUser) return res.sendStatus({ refreshToken })
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const adminId = findAdminUser._id;
            const nama = findAdminUser.namaadmin;
            const email = findAdminUser.email;

            const accessToken = jwt.sign({ adminId, nama, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });
            res.json({ accessToken, nama, email })
        })
    } catch (error) {
        console.log(error);
    }
}

// export { refreshToken, refreshTokenAdmin };
// exports.refreshToken = refreshToken
// exports.refreshTokenAdmin = refreshTokenAdmin