// import User from "../models/userModel.js"
// import bcrypt from 'bcrypt'

const User = require('../models/userModel.js');
// const bcrypt = require('bcrypt');

exports.getUsers = async (req,res) => {
    try {
        const users = await User.find();
        return res.json(users)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        return res.json(user)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

exports.saveUser = async (req,res) => {
    const user = new User(req.body);
    try {
        const insertUser = await user.save();
        return res.status(201).json(insertUser)
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

exports.updateUser = async (req,res) => {
    try {
        const updateUser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        return res.status(200).json(updateUser)
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const deleteUser = await User.deleteOne({_id:req.params.id});
        return res.status(200).json(deleteUser)
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

// export { getUsers, getUserById, saveUser, updateUser, deleteUser };
// exports.getUsers = getUsers
// exports.getUserById = getUserById
// exports.saveUser = saveUser
// exports.updateUser = updateUser
// exports.deleteUser = deleteUser