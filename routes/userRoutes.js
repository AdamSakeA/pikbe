// import express from "express";
// import { getUsers, getUserById, saveUser, updateUser, deleteUser } from "../controllers/userController.js";
// import { verifyToken } from "../middleware/verifyToken.js";
const express = require('express')
const user = require('../controllers/userController.js')
const jwtToken = require('../middleware/verifyToken.js');

const router = express.Router();

router.get('/', user.getUsers);
router.get('/:id', user.getUserById);
// router.post('/users', saveUser);
router.patch('/:id', user.updateUser);
router.delete('/:id', user.deleteUser);

// export default router;
module.exports = router;