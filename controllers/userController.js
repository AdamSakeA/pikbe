// import User from "../models/userModel.js"
// import bcrypt from 'bcrypt'

const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');

const getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const saveUser = async (req,res) => {
    const user = new User(req.body);
    try {
        const insertUser = await user.save();
        res.status(201).json(insertUser)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const updateUser = async (req,res) => {
    try {
        const updateUser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const deleteUser = async (req,res) => {
    try {
        const deleteUser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// export { getUsers, getUserById, saveUser, updateUser, deleteUser };
exports.getUsers = getUsers
exports.getUserById = getUserById
exports.saveUser = saveUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser