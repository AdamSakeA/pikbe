// import express from "express";
// import { getUsers, getUserById, saveUser, updateUser, deleteUser } from "../controllers/userController.js";
// import { verifyToken } from "../middleware/verifyToken.js";
const express = require('express')
const { getUsers, getUserById, saveUser, updateUser, deleteUser } = require('../controllers/userController.js')
const { verifyToken } = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// export default router;
exports.router = router