// import AdminUser from '../models/adminModel.js'
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcrypt'

const AdminUser = require('../models/adminModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const adminLogin = async (req,res) => {
    const { email, password } = req.body;

    const findAdmin = await AdminUser.findOne({
        email : email,
    })

    if(!findAdmin) {
        return res.status(400).json({
            message: "Email not found"
        })
    }

    const isPasswordValid = bcrypt.compareSync(password, findAdmin.password)

    if(!isPasswordValid) {
        return res.status(400).json({
            message: "Wrong password"
        })
    }
    
    const adminId = findAdmin._id; 
    const adminName = findAdmin.namaadmin;
    const accessToken = jwt.sign({adminId, email, adminName}, process.env.ACCESS_TOKEN_SECRET 
        ,{
        expiresIn: '20s'
        }
        )
    const refreshToken = jwt.sign({adminId, email, adminName}, process.env.REFRESH_TOKEN_SECRET 
        ,{
        expiresIn: '1d'
         }
    )
    await AdminUser.updateOne({refresh_token: refreshToken}, adminId);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, adminId, adminName })
}


const adminLogout = async (req,res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);

    const admin = await AdminUser.find({
        refresh_token: refreshToken
    })

    if(!admin) return res.sendStatus(204)
    const adminId = admin._id;
    await AdminUser.updateOne({refresh_token: null}, {adminId});
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

const getAdmins = async (req,res) => {
    try {
        const admins = await AdminUser.find();
        res.json(admins)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteAdmin = async (req,res) => {
    try {
        const deleteAdmin = await AdminUser.deleteOne({_id:req.params.id});
        res.status(200).json(deleteAdmin)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const registerAdmin = async (req,res) => {
    const { namaadmin, email, password, alamat, nomorhp } = req.body;

    const findAdmin = await AdminUser.findOne({
        email: email,
    })

    const findNumber = await AdminUser.findOne({
        nomorhp: nomorhp,
    })

    if(namaadmin, email, password, alamat, nomorhp === "") {
        return res.status(400).json({
            message: "Please Fill The Form!"
        })
    }

    if(findAdmin) {
        return res.status(400).json({
            message: "Email has been taken"
        })
    }

    if(findNumber) {
        return res.status(400).json({
            message: "Phone Number has been taken"
        })
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    await AdminUser.create({
        namaadmin: namaadmin,
        email: email,
        password: hashPassword,
        alamat: alamat,
        nomorhp: nomorhp,
        refresh_token: ""
    })

    res.status(201).json({
        message: "Admin Registered!"
    })
}


export { adminLogin, adminLogout, getAdmins, deleteAdmin, registerAdmin }
exports.adminLogin = adminLogin
exports.adminLogout = adminLogout
exports.getAdmins = getAdmins
exports.deleteAdmin = deleteAdmin
exports.registerAdmin = registerAdmin