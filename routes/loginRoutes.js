// import express from 'express';
// import { getUserLoginById, userLogin } from '../controllers/loginController.js';
// import { refreshToken } from '../controllers/refreshToken.js';
// import { userLogout } from '../controllers/logoutController.js';
// import { getUserById } from '../controllers/userController.js';

const express = require('express');
// const { getUserLoginById, userLogin } = require('../controllers/loginController.js');
const jwtToken = require('../controllers/refreshToken.js');
const logout = require('../controllers/logoutController.js');
const userId = require('../controllers/userController.js');
// const { module } = require('../models/userModel.js');
const login = require('../controllers/loginController.js')

const router = express.Router();

router.post('/login', login.userLogin);
router.get('/:id', userId.getUserById);
router.get('/token', jwtToken.refreshToken); 
router.delete('/logout', logout.userLogout);   


// export default router;
module.exports = router